import { HttpException } from ".";
import ErrorCode from "../constants/error-code";

// For Internal Error Ex: Server Down
class InternalException extends HttpException {
    constructor(message: string, errorCode: ErrorCode, errors: any) {
        super(message, 500, errorCode, errors);
    }
}

export default InternalException;
