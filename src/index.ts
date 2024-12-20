import { getModFile, getRequest } from "./api.js";
import { downloadFile } from "./download.js";
import logger from "./logger.js";
import FabricMetaAPIVersions from "./interfaces/api/FabricMetaAPI.js";
import { exec, spawn } from "child_process";
import { join } from "path";
import winston from "winston";

getRequest(
  "fabric",
  "/v2/versions",
  (error, response: FabricMetaAPIVersions) => {
    if (error) {
      logger.error(error);
    } else {
      downloadFile(
        response.installer[0].url,
        null,
        "fabric-installer.jar",
        "game",
        (err) => {
          if (err) {
            logger.error(err);
          } else {
            let user = join(process.cwd(), "/game/mc");
            logger.info(user);
            let cmd = `java -jar ./game/fabric-installer.jar client -noprofile -dir "${user}"`;
            let cp = exec(cmd);
            cp.on("message", (msg) => {
              logger.error(msg.toString());
            });
            cp.on("exit", (code) => {
              logger.info("Fabric Installer exited with code " + code);
            });
          }
          // java -jar fabric-installer.jar client -dir "~/Games/.minecraft"
        }
      );
    }
  }
);
