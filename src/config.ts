import Config from "./interfaces/config/Config.js";

import DEFAULT_CONFIG from "../default_config.json" with {type: "json"};
import conf from "config";

function getDepth(depth: string, next: string): string {
    return ((depth != "") ? depth + "." : "") + next;
}

function loadAllConfigDataHelper(configMap: any, depth: string = ""): Object {
    let finalObj = {}; // Store config items at this level here.
    let keys = Object.keys(configMap); // Get all keys from the object, assuming config matches default layout.

    // For debug
    // console.debug("Root: " + depth)
    // console.debug("Looking for: " + ((depth != "") ? depth + "." : "") + "[" + keys.join(", ") + "]");

    for (let i = 0; i < keys.length; i++) {
        if (typeof configMap[keys[i]] == "object") {
            finalObj[keys[i]] = loadAllConfigDataHelper(configMap[keys[i]], getDepth(depth, keys[i]));
        } else {
            finalObj[keys[i]] = conf.get(getDepth(depth, keys[i]));
        }
    }

    return finalObj;
}

export function loadConfigData(): Config {
    return <Config>loadAllConfigDataHelper(DEFAULT_CONFIG);
}

const configData = loadConfigData();
export const version = configData.version;
export const config = configData.config;
export default config;