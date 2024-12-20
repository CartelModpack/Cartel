import { createHash } from "crypto";
import { createWriteStream, createReadStream } from "fs";
import path from "path";
import { Readable } from "stream";

export function getHash(path: string): Promise<string> {
  return new Promise(
    (resolve: (hash: string) => void, reject: (reason: Error) => void) => {
      const hash = createHash("sha512");
      const rs = createReadStream(path);
      rs.on("error", reject);
      rs.on("data", (chunk) => hash.update(chunk));
      rs.on("end", () => resolve(hash.digest("hex")));
    }
  );
}

export function downloadFile(
  url: string,
  sha512: string,
  fileName: string,
  savePath: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        let filePath = path.join(savePath, fileName);
        let writer = createWriteStream(path.join(savePath, fileName));
        let piper = Readable.fromWeb(res.body);
        piper.pipe(writer);

        piper.on("end", () => {
          getHash(filePath)
            .then((calcSha) => {
              if (sha512 != null && calcSha != sha512) {
                reject(
                  new Error(
                    `File integrety not maintained. Expected ${sha512} but got ${calcSha}`
                  )
                );
              } else {
                resolve();
              }
            })
            .catch(reject);
        });
        piper.on("error", reject);
      })
      .catch((error) => {
        reject(new Error(error));
      });
  });
}
