import { getRequest } from "./api";
import { ModrinthAPIVersionResponse } from "./interfaces/api/ModrinthAPI";

getRequest("modrinth", '/v2/project/AANobbMI/version?loaders=["fabric"]&game_versions=["1.21.4"]', (error, res: ModrinthAPIVersionResponse) => {
    if (error) {
        console.error(error.message);
    } else {
        console.info(res[0].files[0].url);
    }
})