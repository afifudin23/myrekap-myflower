import { HttpException } from ".";
import ErrorCode from "@/constants/error-code";

class ForbiddenException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, 403, errorCode, null);
  }
}

export default ForbiddenException;
