import { join } from "path";
import { exec, EXPORT_PACKAGES } from "./lib.js";

for (const pkg of EXPORT_PACKAGES) {
  console.info(`Updating mods for cartel-${pkg}...`);
  await exec(
    `packwiz migrate minecraft ${process.argv.slice(2)[0]} --yes`,
    join(process.cwd(), pkg)
  );
}
