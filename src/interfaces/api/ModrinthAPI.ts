import Version from "../game/Version"

export type ModrinthLoader = "fabric";
export interface ModrinthFile {
    hashes: {
        sha1: string,
        sha512: string
    },
    url: string,
    filename: string,
    primary: boolean,
    size: number,
    file_type: string
}
export interface ModrinthProjectVersion {
    game_versions: Version[],
    loaders: ModrinthLoader[],
    id: string,
    project_id: string,
    features: boolean,
    name: string,
    version_number: string,
    changelog: string,
    changelog_url: string,
    date_published: string,
    downloads: number,
    version_type: 'release',
    status: string,
    requested_status: null,
    files: ModrinthFile[],
    dependencies: []
}
export type ModrinthAPIVersionResponse = ModrinthProjectVersion[];