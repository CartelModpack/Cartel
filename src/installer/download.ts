import { createHash } from "crypto";
import { createWriteStream, createReadStream, access, rm } from "fs";
import path from "path";
import { Readable } from "stream";
import logger from "../logger.js";

export type HashType = "sha256" | "sha512";
export interface Hash {
  type: HashType;
  hash: string;
}

export function pipeToFile(path: string, readStream: Readable): Promise<void> {
  return new Promise((resolve, reject) => {
    let writer = createWriteStream(path);
    readStream.pipe(writer);
    readStream.on("end", resolve);
    readStream.on("error", reject);
  });
}

export function getHash(path: string, type: HashType): Promise<string> {
  return new Promise(
    (resolve: (hash: string) => void, reject: (reason: Error) => void) => {
      const hash = createHash(type);
      const rs = createReadStream(path);
      rs.on("error", reject);
      rs.on("data", (chunk) => hash.update(chunk));
      rs.on("end", () => resolve(hash.digest("hex")));
    }
  );
}

export function downloadFile(
  url: string,
  savePath: string,
  fileName: string,
  hash?: Hash
): Promise<void> {
  return new Promise((resolve, reject) => {
    logger.verbose(`Downloading file ${url} as ${fileName}...`);
    fetch(url)
      .then((res) => {
        let filePath = path.join(savePath, fileName);

        pipeToFile(filePath, Readable.fromWeb(res.body))
          .then(() => {
            if (hash != null) {
              logger.verbose(`Checking ${fileName} hash...`);
              getHash(filePath, hash.type)
                .then((calcSha) => {
                  if (calcSha != hash.hash) {
                    reject(
                      new Error(
                        `File integrety not maintained. Expected ${hash.hash} but got ${calcSha}`
                      )
                    );
                  } else {
                    logger.verbose(`${fileName} downloaded!`);
                    resolve();
                  }
                })
                .catch(reject);
            } else {
              logger.verbose(`${fileName} downloaded!`);
              resolve();
            }
          })
          .catch(reject);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}

export function downloadAll(
  urls: string[],
  savePath: string,
  fileNames?: string[],
  hash?: Hash[]
): Promise<void[]> {
  logger.verbose(`Downloading ${urls.length} file(s)...`);

  let promises: Promise<void>[] = [];

  for (let i = 0; i < urls.length; i++) {
    promises.push(
      downloadFile(
        urls[i],
        fileNames != null && fileNames[i] != null
          ? fileNames[i]
          : path.basename(urls[i]),
        savePath,
        hash != null && hash[i] != null ? hash[i] : null
      )
    );
  }

  return Promise.all(promises).then((all) => {
    logger.verbose(`Downloaded all ${urls.length} file(s)!`);
    return all;
  });
}

export function deleteFile(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    access(path, (error) => {
      if (error) {
        reject(error);
      } else {
        rm(path, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      }
    });
  });
}
