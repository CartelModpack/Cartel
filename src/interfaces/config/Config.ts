import { APIUrl } from "../api/APIRequests.js";

export default interface Config {
    version: number,
    config: {
        api: {
            server: APIUrl
            modrinth: APIUrl
        }
    }
}