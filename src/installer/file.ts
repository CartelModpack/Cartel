import { mkdir, access } from "fs/promises";

export function createDir(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    access(path)
      .then(resolve)
      .catch(() => {
        mkdir(path).then(resolve).catch(reject);
      });
  });
}
