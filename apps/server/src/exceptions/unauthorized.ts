import { HttpException } from ".";
import ErrorCode from "@/constants/error-code";

class UnauthorizedException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, 401, errorCode, null);
  }
}

export default UnauthorizedException;
