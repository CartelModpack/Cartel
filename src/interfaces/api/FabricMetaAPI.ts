export interface FabricMetaAPIGameVersions {
  version: string;
  stable: boolean;
}
export interface FabricMetaAPIMappingsVersions {
  gameVersion: string;
  separator: string;
  build: number;
  maven: string;
  version: string;
  stable: boolean;
}
export interface FabricMetaAPIIntermediaryVersions {
  maven: string;
  version: string;
  stable: boolean;
}
export interface FabricMetaAPILoaderVersions {
  separator: string;
  build: number;
  maven: string;
  version: string;
  stable: boolean;
}
export interface FabricMetaAPIInstallerVersions {
  url: string;
  maven: string;
  version: string;
  stable: boolean;
}

export interface FabricMetaAPIVersionArguments {
  game: string[];
  jvm: string[];
}
export interface FabricMetaAPIVersionLibrary {
  name: string;
  url: string;
  md5: string;
  sha1: string;
  sha256: string;
  sha512: string;
  size: number;
}

export interface FabricMetaAPIVersionProfile {
  id: string;
  inheritsFrom: string;
  releaseTime: string;
  time: string;
  type: "release";
  mainClass: string;
  arguments: FabricMetaAPIVersionArguments;
  libraries: FabricMetaAPIVersionLibrary[];
}

export interface FabricMetaAPIVersions {
  game: FabricMetaAPIGameVersions[];
  mappings: FabricMetaAPIMappingsVersions[];
  intermediary: FabricMetaAPIIntermediaryVersions[];
  loader: FabricMetaAPILoaderVersions[];
  installer: FabricMetaAPIInstallerVersions[];
}
