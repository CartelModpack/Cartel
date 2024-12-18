import winston from "winston";

winston.loggers.add("default", {
    level: 'info',
    defaultMeta: "Cartel",
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        })
    ],
});

export const logger = winston.loggers.get("default");
export default logger;