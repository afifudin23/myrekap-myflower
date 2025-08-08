import ErrorCode from "../constants/error-code";
import HttpException from "../exceptions/http-exception";

class MidtransException extends HttpException {
    constructor(message: string, statusCode: number, errorCode: ErrorCode) {
        super(message, statusCode, errorCode, null);
    }
}

export default MidtransException;
