import DEFAULT_CONFIG from "../../default_config.json" with {type: "json"};
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import logger from "../logger.js";

logger.info("Updating the config file for Cartel...");

const configDir = join(process.cwd(), "./config/");
const configPath = join(configDir, "./default.json");

if (!existsSync(configPath)) {
    writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2), "utf-8");
}

logger.info("Config updated!");