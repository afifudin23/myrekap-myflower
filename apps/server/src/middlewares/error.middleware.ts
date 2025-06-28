import { NextFunction, Request, Response } from "express";
import { HttpException } from "@/exceptions";
// import multer from "multer";

const errorMiddleware = (error: HttpException, _req: Request, res: Response, _next: NextFunction) => {
    // if (error instanceof multer.MulterError) {
    //     // Error from Multer
    //     if (error.code === "LIMIT_FILE_SIZE") {
    //         res.status(422).json({
    //             message: "File terlalu besar (maks 2MB)",
    //             code: "UNPROCESSABLE_ENTITY",
    //             errors: null,
    //         });
    //     }
    // } else {
        res.status(error.statusCode || 500).json({
            message: error.message,
            errorCode: error.errorCode,
            errors: error.errors,
        });
    // }
};

export default errorMiddleware;
