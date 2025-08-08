import { HttpException } from ".";
import ErrorCode from "../constants/error-code";

class BadRequestException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, 400, errorCode, null);
    }
}

export default BadRequestException;
