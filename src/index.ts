import { getModFile } from "./api";
import { downloadFile } from "./download";
import { ModrinthAPIVersionResponse } from "./interfaces/api/ModrinthAPI";

getModFile("AANobbMI", "fabric", "1.21.4", (err, url, sha512) => {
    if (err) {
        console.error(err.message);
    } else {
        downloadFile(url, sha512, "sodium.jar", "game", err => {
            if (err) console.error(err.message);
        })
    }
})