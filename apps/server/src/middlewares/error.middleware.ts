import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";

const errorMiddleware = (error: HttpException, _req: Request, res: Response, _next: NextFunction) => {
    res.status(error.statusCode || 500).json({
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors,
    });
};

export default errorMiddleware;
