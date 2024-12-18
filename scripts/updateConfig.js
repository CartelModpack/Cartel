import DEFAULT_CONFIG from "../default_config.json" with {type: "json"};
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";


const configDir = join(process.cwd(), "./config/");
const configPath = join(configDir, "./default.json");

if (!existsSync(configPath)) {
    if (!existsSync(configDir)) mkdirSync(configDir);
    writeFileSync(configPath, JSON.stringify(DEFAULT_CONFIG, null, 2), "utf-8");
}