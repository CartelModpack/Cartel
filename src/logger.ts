import winston from "winston";

winston.loggers.add("default", {
  level: "verbose",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.label({ label: "Cartel" }),
    winston.format.timestamp(),
    winston.format.printf(
      (info) =>
        `[${new Date(<string>info.timestamp).toUTCString()}] <${info.label}> ${
          info.level
        }: ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()],
});

export const logger = winston.loggers.get("default");
export default logger;
