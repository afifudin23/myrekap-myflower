import morgan, { StreamOptions } from "morgan";
import { Request } from "express";
import logger from "@/utils/logger.util";

const morganFormat = ":method :url :status - :response-time ms [RequestID: :requestId]";
const stream: StreamOptions = {
  write: (message) => {
    const statusCode = parseInt(message.split(" ")[2], 10); // get status code from message
    if (statusCode >= 400) {
      logger.error(message.trim());
    } else {
      logger.http(message.trim());
    }
  },
};
morgan.token("requestId", (req: Request) => req.requestId || "N/A");

const httpLogger = morgan(morganFormat, { stream });

export default httpLogger;
