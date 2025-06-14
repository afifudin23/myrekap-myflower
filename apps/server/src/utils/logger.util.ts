import { createLogger, format, transports } from "winston";

const { combine, printf, timestamp } = format;

const logFormat = combine(
  timestamp(),
  printf(({ level, message, timestamp, requestId }) => {
    return `[${timestamp}] ${level.toUpperCase()}${requestId ? ` [${requestId}]` : ""}: ${message}`;
  })
);

const logger = createLogger({
  level: "http",
  format: logFormat,
  transports: [new transports.Console(), new transports.File({ filename: "error.log", level: "error" })],
});

export default logger;
