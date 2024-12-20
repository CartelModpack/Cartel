import { getRequest } from "./api/api.js";
import args from "./installer/getDesiredVersion.js";
import CartelAPIResponse, {
  CartelAPILatest,
} from "./interfaces/api/CartelAPI.js";
import logger from "./logger.js";

function printError(errorFrom: string) {
  return (error: any) => logger.error(`${errorFrom} > ${error}`);
}

logger.info("Starting up Cartel Updater...");

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
    } else {
      printError("Cartel Server")(cartelLatest.error);
    }
  })
  .catch(printError("Cartel Server"));
