import { APIUrl } from "../api/APIRequests";

export default interface Config {
    version: number,
    config: {
        api: {
            server: APIUrl
            modrinth: APIUrl
        }
    }
}