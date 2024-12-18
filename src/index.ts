import { getModFile } from "./api";
import { downloadFile } from "./download";
import logger from "./logger";

getModFile("AANobbMI", "fabric", "1.21.4", (err, url, sha512) => {
    if (err) {
        logger.error(err.message);
    } else {
        downloadFile(url, sha512, "sodium.jar", "game", err => {
            if (err) (err.message);
        })
    }
})