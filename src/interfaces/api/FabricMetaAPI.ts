export interface FabricMetaAPIGameVersions {
    version: string,
    stable: boolean
}
export interface FabricMetaAPIMappingsVersions {
    gameVersion: string,
    separator: string,
    build: number,
    maven: string,
    version: string,
    stable:	boolean
}
export interface FabricMetaAPIIntermediaryVersions {
    maven: string,
    version: string,
    stable: boolean
}
export interface FabricMetaAPILoaderVersions {
    separator: string,
    build: number,
    maven: string,
    version: string,
    stable: boolean
}
export interface FabricMetaAPIInstallerVersions {
    url: string,
    maven: string,
    version: string,
    stable: boolean
}

export default interface FabricMetaAPIVersions {
    game: FabricMetaAPIGameVersions[],
    mappings: FabricMetaAPIMappingsVersions[],
    intermediary: FabricMetaAPIIntermediaryVersions[],
    loader: FabricMetaAPILoaderVersions[],
    installer: FabricMetaAPIInstallerVersions[]
}