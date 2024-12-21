import { spawn } from "child_process";
import logger from "../logger.js";
import { access, existsSync, rename, renameSync } from "fs";
import { join } from "path";

export function runJar(
  file: string,
  execPath: string,
  commandLineArgs: string[],
  processTimeout: number = 20000
): Promise<number> {
  return new Promise((resolve, reject) => {
    logger.verbose(`Running jar "${file}"`);
    let child_proc = spawn("java", ["-jar", file, ...commandLineArgs], {
      cwd: execPath,
    });

    child_proc.stdout.on("data", (data) => {
      let str = data.toString();
      logger.verbose(`[${file}] ${str.slice(0, str.length - 2)}`);
    });
    child_proc.stderr.on("data", (data) => {
      let str = data.toString();
      logger.warn(`[${file}] ${str.slice(0, str.length - 2)}`);
    });

    let wasExited = false;
    child_proc.on("exit", (code) => {
      let codeMsg = `[${file}] Process exited with code ${code}`;
      wasExited = true;
      if (code == 0) {
        logger.verbose(codeMsg);
        resolve(code);
      } else {
        reject(new Error(codeMsg));
      }
    });
    child_proc.on("error", reject);

    setTimeout(() => {
      if (!wasExited) {
        child_proc.kill(1);
        reject(new Error("Jar took to long to execute"));
      }
    }, processTimeout);
  });
}
