import { URL } from "url";
import DEFAULT_CONFIG from "../default_config.json";
import config from "config";

export interface APIUrl {
    protocol: "http" | "https",
    url: string
}
export interface Config {
    version: number,
    config: {
        api: {
            server: APIUrl
            modrinth: APIUrl
        }
    }
}

function loadAllConfigDataHelper(configMap: any, depth: string = ""): Object {
    let finalObj = {}; // Store config items at this level here.
    let keys = Object.keys(configMap); // Get all keys from the object, assuming config matches default layout.

    for (let i = 0; i < keys.length; i++) {
        if (typeof configMap[keys[i]] == "object") {
            finalObj[keys[i]] = loadAllConfigDataHelper(configMap[keys[i]], keys[i]);
        } else {
            finalObj[keys[i]] = config.get(((depth != "") ? depth + "." : "") + keys[i]);
        }
    }

    return finalObj;
}

export default function loadConfigData(): Config {
    return <Config>loadAllConfigDataHelper(DEFAULT_CONFIG);
}