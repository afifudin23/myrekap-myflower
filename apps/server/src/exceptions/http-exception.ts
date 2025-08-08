import ErrorCode from "../constants/error-code";

class HttpException extends Error {
    message: string;
    statusCode: number;
    errorCode: number;
    errors: any;

    constructor(message: string, statusCode: number, errorCode: ErrorCode, errors: any) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.errors = errors;
    }
}

export default HttpException;
