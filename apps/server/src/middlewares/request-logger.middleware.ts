import logger from "../utils/logger.util";
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

declare module "express" {
    interface Request {
        requestId?: string;
        logger?: typeof logger;
    }
}

const attachLogger = (req: Request, _res: Response, next: NextFunction) => {
    req.requestId = uuidv4();
    req.logger = logger.child({ requestId: req.requestId });
    next();
};

export default attachLogger;
