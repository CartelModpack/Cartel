import { getRequest } from "./api/api.js";
import args from "./installer/getDesiredVersion.js";
import CartelAPIResponse, {
  CartelAPILatest,
} from "./interfaces/api/CartelAPI.js";
import logger from "./logger.js";
import { FabricMetaAPIVersionProfile } from "./interfaces/api/FabricMetaAPI.js";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";
import { createDir } from "./installer/file.js";

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
                .then(() => {})
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
