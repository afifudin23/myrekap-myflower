import { HttpException } from ".";
import ErrorCode from "@/constants/error-code";

class NotFoundException extends HttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, 404, errorCode, null);
  }
}

export default NotFoundException;
