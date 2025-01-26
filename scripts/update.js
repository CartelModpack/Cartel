import { join } from "path";
import { exec, EXPORT_PACKAGES } from "./lib.js";

for (const pkg of EXPORT_PACKAGES) {
  console.info(`Updating mods for cartel-${pkg}...`);
  await exec(`packwiz update --all`, join(process.cwd(), pkg));
}
