import { getAllModFiles, getRequest } from "./api/api.js";
import args from "./installer/getDesiredVersion.js";
import CartelAPIResponse, {
  CartelAPILatest,
  CartelAPIModList,
} from "./interfaces/api/CartelAPI.js";
import logger from "./logger.js";
import { FabricMetaAPIVersionProfile } from "./interfaces/api/FabricMetaAPI.js";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { createDir } from "./installer/file.js";
import { downloadAll, Hash } from "./installer/download.js";

// Print errors out nicely
function printError(errorFrom: string) {
  return (error: any) => logger.error(`${errorFrom} > ${error}`);
}

logger.info("Starting up Cartel Updater...");

logger.info("Getting Latest Cartel Versions...");
// Get the latest versions of cartel, fabric, mc, etc.
getRequest("server", "/api/v1/latest")
  .then((cartelLatest: CartelAPIResponse<CartelAPILatest>) => {
    if (cartelLatest.status == 200) {
      // Get the install options we are using.
      let options = {
        minecraft:
          args.minecraft == "latest" || args.minecraft == null
            ? cartelLatest.content.game
            : args.minecraft,
        fabric:
          args.fabric == "latest" || args.fabric == null
            ? cartelLatest.content.loader
            : args.fabric,
      };

      // Let the user know whats up...
      logger.info(
        `Installing Cartel v${cartelLatest.content.cartel} [${options.minecraft}/Fabric ${options.fabric}]`
      );

      // Get default fabric profile data
      logger.info("Getting Default Fabric Profile...");

      getRequest("fabric", "/v2/versions/loader/1.21.4/0.16.9/profile/json")
        .then((profileData: FabricMetaAPIVersionProfile) => {
          let vers = "temp"; // This will be updated later...
          profileData.id = `cartel-${vers}-${options.fabric}-${options.minecraft}`;

          logger.info("Create Version in Launcher...");

          createDir(join(args.launcher, "/versions/", profileData.id))
            .then(() => {
              logger.info("Setting up version...");

              Promise.all([
                writeFile(
                  join(
                    args.launcher,
                    "/versions/",
                    profileData.id,
                    `${profileData.id}.json`
                  ),
                  JSON.stringify(profileData)
                ),
                createDir(join(args.launcher, "/mods")),
                createDir(join(args.launcher, "/config")),
              ])
                .then(() => {
                  logger.info("Getting mod files...");

                  getRequest("server", `/api/v1/content/vanilla/${options.minecraft}/mods`).then((modData: CartelAPIResponse<CartelAPIModList>) => {
                    let ids: string[] = [];
                    for (let data of modData.content) {
                      ids.push(data.mod);
                    }

                    getAllModFiles(ids, "fabric", options.minecraft).then((modFiles) => {
                      let urls: string[] = [], names: string[] = [], hashes: Hash[] = [];

                      for (let mod of modFiles) {
                        urls.push(mod.url);
                        names.push(mod.file);
                        hashes.push({
                          type: "sha512",
                          hash: mod.sha512
                        });
                      }

                      downloadAll(urls, join(args.launcher, "/mods"), names, hashes).then(() => {

                      }).catch(printError("Install Cartel/Fabric Version [Mods]"));
                    }).catch(printError("Install Cartel/Fabric Version [Mods 1]"));
                  }).catch(printError("Install Cartel/Fabric Version [Mods]"));
                })
                .catch(printError("Install Cartel/Fabric Version"));
            })
            .catch(printError("Install Cartel/Fabric Version"));
        })
        .catch(printError("Get Default Fabric Profile"));
    } else {
      printError("Get Cartel Server Latest")(cartelLatest.error);
    }
  })
  .catch(printError("Get Cartel Server Latest"));
