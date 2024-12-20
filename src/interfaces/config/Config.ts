export default interface Config {
    version: number,
    config: {
        api: {
            server: string,
            modrinth: string,
            fabric: string
        }
    }
}