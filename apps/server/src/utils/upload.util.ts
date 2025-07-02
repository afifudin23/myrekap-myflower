import ErrorCode from "@/constants/error-code";
import { UnprocessableUntityException } from "@/exceptions";
import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
const storage = multer.memoryStorage();
const fileFilter = (_req: any, file: any, cb: FileFilterCallback) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(
            new UnprocessableUntityException("Only image files are allowed", ErrorCode.UNPROCESSABLE_UNTITY, null)
        );
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024, // ✅ maksimal 2MB
    },
});

export const none = () => upload.none();

export const single = (field: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const uploader = upload.single(field);
        uploader(req, res, (error: any) => {
            if (error?.code === "LIMIT_FILE_SIZE") {
                return next(
                    new UnprocessableUntityException("File size too large", ErrorCode.UNPROCESSABLE_UNTITY, error)
                );
            } else if (error?.message.includes("Only image")) {
                return next(error);
            }
            next();
        });
    };
};

export const multiple = (field: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const uploader = upload.array(field, 5);
        uploader(req, res, (error: any) => {
            if (error?.code === "LIMIT_FILE_SIZE") {
                return next(
                    new UnprocessableUntityException("File size too large", ErrorCode.UNPROCESSABLE_UNTITY, error)
                );
            } else if (error?.code === "LIMIT_UNEXPECTED_FILE") {
                return next(
                    new UnprocessableUntityException("Too many files, max 5 files", ErrorCode.UNPROCESSABLE_UNTITY, error)
                );
            } else if (error?.message.includes("Only image")) {
                return next(error);
            }
            next();
        });
    };
};
