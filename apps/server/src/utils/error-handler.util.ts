import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { HttpException, InternalException, UnprocessableUntityException } from "@/exceptions";
import { ErrorCode } from "@/constants/error-code";
import multer from "multer";

const errorHandler = (method: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error) {
            let exception: HttpException;
            if (error instanceof HttpException) {
                exception = error;
            } else {
                if (error instanceof ZodError) {
                    exception = new UnprocessableUntityException(
                        "Invalid data",
                        ErrorCode.UNPROCESSABLE_UNTITY,
                        error.issues
                    );
                } else if (error instanceof multer.MulterError) {
                    // if (error.code === "LIMIT_FILE_SIZE") {
                    //     exception = new UnprocessableUntityException(
                    //         "File size too large",
                    //         ErrorCode.UNPROCESSABLE_UNTITY,
                    //         error
                    //     );
                    // }
                    if (error.code === "LIMIT_FILE_SIZE") {
                        exception = new UnprocessableUntityException(
                            "File size too largexxxx",
                            ErrorCode.UNPROCESSABLE_UNTITY,
                            error
                        );
                    } else {
                        exception = new UnprocessableUntityException(
                            error.message || "Upload failed",
                            ErrorCode.UNPROCESSABLE_UNTITY,
                            error
                        );
                    }
                } else {
                    exception = new InternalException(
                        "Something went wrong. Please try again later.",
                        ErrorCode.INTERNAL_EXCEPTION,
                        error
                    );
                }
            }
            exception.statusCode = exception.statusCode || 500;
            next(exception);
        }
    };
};

export default errorHandler;
