import { getModFile } from "./api";
import { ModrinthAPIVersionResponse } from "./interfaces/api/ModrinthAPI";

getModFile("AANobbMI", "fabric", "1.21.4", (error, url) => {
    if (error) {
        console.error(error.message);
    } else {
        console.info(url);
    }
})