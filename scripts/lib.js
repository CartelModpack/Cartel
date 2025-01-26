import { exec as childProcessExec } from "child_process";

export const EXPORT_PACKAGES = ["base", "enhanced", "advanced"];
export const EXPORT_TARGETS = ["modrinth", "curseforge"];

export async function exec(cmd, cwd = process.cwd()) {
  return await new Promise((resolve, reject) => {
    childProcessExec(cmd, { cwd }, (error) => {
      if (error) reject(error);
      resolve();
    });
  });
}
