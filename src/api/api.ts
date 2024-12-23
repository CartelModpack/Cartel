import path from "path";
import config from "../config.js";
import { APIName } from "../interfaces/api/APIRequests.js";
import {
  ModrinthAPIVersions,
  ModrinthLoader,
  ModrinthAPIShortFile,
} from "../interfaces/api/ModrinthAPI.js";
import logger from "../logger.js";

export function getRequest(server: APIName, endpoint: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(path.join(config.api[server], endpoint))
      .then((raw) => raw.json())
      .then(resolve)
      .catch(reject);
  });
}

export function getModFile(
  id: string,
  loader: ModrinthLoader,
  version: string
): Promise<ModrinthAPIShortFile> {
  return new Promise((resolve, reject) => {
    getRequest(
      "modrinth",
      `/v2/project/${id}/version?loaders=["${loader}"]&game_versions=["${version}"]`
    )
      .then((res: ModrinthAPIVersions) => {
        resolve({
          name: res[0].name,
          file: res[0].files[0].filename,
          url: res[0].files[0].url,
          sha512: res[0].files[0].hashes.sha512,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAllModFiles(
  ids: string[],
  loader: ModrinthLoader,
  version: string
): Promise<ModrinthAPIShortFile[]> {
  return new Promise((resolve, reject) => {
    let fileData: ModrinthAPIShortFile[] = [];
    let promises: Promise<ModrinthAPIShortFile>[] = [];

    for (let id of ids) {
      let promise = getModFile(id, loader, version);
      promise.then((modData) => {
        fileData.push(modData);
      }).catch(() => {})
      promises.push(promise);
    }

    Promise.all(promises).then(() => {
      resolve(fileData);
    }).catch((err) => {
      reject(err);
    })
    
  });
}