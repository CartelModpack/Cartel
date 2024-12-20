import logger from "../logger.js";
import fs from "fs";
import { join } from "path";

logger.info("Creating folders for Cartel...");

const PATHS: string[] = [
  join(process.cwd(), "/config"),
  join(process.cwd(), "/cache"),
];

for (let path of PATHS) {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
}

logger.info("Folders created!");
