export type ModrinthLoader = "fabric";
export interface ModrinthAPIFile {
  hashes: {
    sha1: string;
    sha512: string;
  };
  url: string;
  filename: string;
  primary: boolean;
  size: number;
  file_type: string;
}
export interface ModrinthAPIShortFile {
  name: string;
  file: string;
  url: string;
  sha512: string;
}
export interface ModrinthAPIProjectVersion {
  game_versions: string[];
  loaders: ModrinthLoader[];
  id: string;
  project_id: string;
  features: boolean;
  name: string;
  version_number: string;
  changelog: string;
  changelog_url: string;
  date_published: string;
  downloads: number;
  version_type: "release";
  status: string;
  requested_status: null;
  files: ModrinthAPIFile[];
  dependencies: [];
}
export type ModrinthAPIVersions = ModrinthAPIProjectVersion[];
