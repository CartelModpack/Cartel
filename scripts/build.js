import { join } from "path";
import { exec, EXPORT_TARGETS, EXPORT_PACKAGES } from "./lib.js";
import { existsSync, mkdirSync, renameSync } from "fs";

if (!existsSync(join(process.cwd(), "./dist"))) {
  mkdirSync(join(process.cwd(), "./dist"));
}

for (const pkg of EXPORT_PACKAGES) {
  for (const target of EXPORT_TARGETS) {
    console.info(`Exporting cartel-${pkg} for ${target}...`);

    const filename = `cartel-${pkg}.${
      target === "modrinth" ? "mrpack" : "zip"
    }`;

    await exec(
      `packwiz ${target} export -o ${filename}`,
      join(process.cwd(), pkg)
    );

    renameSync(
      join(process.cwd(), pkg, filename),
      join(process.cwd(), "./dist", filename)
    );
  }
}
