import args from "./installer/getDesiredVersion.js";
import logger from "./logger.js";

logger.info(JSON.stringify(args, null, 2));

/*
function printError(from: string) {
  return (error) => logger.error(`${from} > ${new Error(error)}`);
}

logger.info("Booting Cartel Updater...");
getRequest("server", "/api/v1/latest")
  .then((data: CartelAPIResponse<CartelAPILatest>) => {
    if (data.status == 200) {
      let { content } = data;
      logger.info("Latest Versions: " + JSON.stringify(content, null, 0));
      getRequest(
        "fabric",
        `/v2/versions/loader/${content.game}/${content.loader}/profile/json`
      )
        .then((fabricLoaderData: any) => {
          logger.info(
            `Would use "${fabricLoaderData.id}" as a base, renamed to "Cartel v${content.cartel} [${content.game}/4Fabric ${content.loader}]"`
          );
        })
        .catch(printError("Fabric Request"));
    } else {
      logger.warn(`Status Code ${data.status}: ${data.error}`);
    }
  })
  .catch(printError("Cartel Server Request"));

getRequest(
  "fabric",
  "/v2/versions/loader/:game_version/:loader_version/profile/json",
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
*/
