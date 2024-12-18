import config from "../../config.js";

export interface APIUrl {
    protocol: "http" | "https",
    url: string
}
export type APIName = keyof typeof config.api;