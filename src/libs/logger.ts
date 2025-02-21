import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: process.env.NEXT_PUBLIC_LOG_DEBUG === "true" ? "debug" : "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD | HH:mm:ss" }),
    format.json(),
    format.prettyPrint(),
    format.colorize({ all: true }),
    format.printf(
      ({ timestamp, level, message, ...rest }) => {
        return `${timestamp} | [${level}] | ${message} | ${JSON.stringify(rest)}`;
      }
    ),
  ),
  transports: [
    new transports.Console()
  ],
});

export default logger;
