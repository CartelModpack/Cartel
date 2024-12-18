import { createHash } from "crypto";
import { createWriteStream, createReadStream } from "fs";
import path from "path";
import { Readable } from "stream";

export function getHash(path: string): Promise<string> {
    return new Promise((resolve: (hash: string) => void, reject: (reason: Error) => void) => {
        const hash = createHash('sha512');
        const rs = createReadStream(path);
        rs.on('error', reject);
        rs.on('data', chunk => hash.update(chunk));
        rs.on('end', () => resolve(hash.digest('hex')));
    })
};

export function downloadFile(url: string, sha512: string, fileName: string, savePath: string, callback: (error?: Error) => void) {
    fetch(url).then(res => {
        let filePath = path.join(savePath, fileName);
        let writer = createWriteStream(path.join(savePath, fileName))
        let piper = Readable.fromWeb(res.body);
        piper.pipe(writer);

        piper.on("end", () => {
            getHash(filePath).then(calcSha => {
                if (calcSha != sha512) {
                    callback(new Error(`File integrety not maintained. Expected ${sha512} but got ${calcSha}`));
                } else {
                    callback();
                }
            }).catch(callback);
            
        });
        piper.on("error", callback);
    }).catch(error => {
        callback(new Error(error));
    })
}