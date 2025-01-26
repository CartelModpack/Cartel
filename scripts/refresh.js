import { join } from "path";
import { exec, EXPORT_PACKAGES } from "./lib.js";

for (const pkg of EXPORT_PACKAGES) {
  console.info(`Refreshing cartel-${pkg}...`);
  await exec(`packwiz refresh`, join(process.cwd(), pkg));
}
