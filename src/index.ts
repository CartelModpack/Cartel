import { getModFile } from "./api.js";
import { downloadFile } from "./download.js";
import logger from "./logger.js";

getModFile("AANobbMI", "fabric", "1.21.4", (err, url, sha512) => {
    if (err) {
        logger.error(err.message);
    } else {
        downloadFile(url, sha512, "sodium.jar", "game", err => {
            if (err) (err.message);
        })
    }
})