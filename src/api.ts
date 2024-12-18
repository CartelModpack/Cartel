import path from "path";
import config from "./config";
import { APIName } from "./interfaces/api/APIRequests";
import Version from "./interfaces/game/Version";
import { ModrinthAPIVersionResponse, ModrinthLoader } from "./interfaces/api/ModrinthAPI";

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

export function getModFile(id: string, loader: ModrinthLoader, version: Version, callback: (error: Error, url: string, sha512: string) => void) {
    getRequest("modrinth", `/v2/project/${id}/version?loaders=["${loader}"]&game_versions=["${version}"]`, (error, res: ModrinthAPIVersionResponse) => {
        if (error) {
            callback(error, null, null);
        } else {
            callback(null, res[0].files[0].url, res[0].files[0].hashes.sha512);
        }
    });
}