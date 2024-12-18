import path from "path";
import config from "./config";
import { APIName } from "./interfaces/api/APIRequests";

export function getRequest(server: APIName, endpoint: string, callback: (error: Error, response: Object) => void) {
    fetch(path.join(config.api[server].protocol + "://", config.api[server].url, endpoint))
        .then((res) => {
            res.json()
                .then((json) => {
                    callback(null, json);
                })
                .catch((error) => {
                    callback(new Error(error), null);
                })
        })
        .catch((error) => {
            callback(new Error(error), null);
        })
}