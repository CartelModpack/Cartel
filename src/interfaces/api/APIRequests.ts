import config from "../../config";

export interface APIUrl {
    protocol: "http" | "https",
    url: string
}
export type APIName = keyof typeof config.api;