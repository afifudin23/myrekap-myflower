import { HttpException } from ".";
import ErrorCode from "@/constants/error-code";

class UnprocessableUntityException extends HttpException {
  constructor(message: string, errorCode: ErrorCode, errors: any) {
    super(message, 422, errorCode, errors);
  }
}

export default UnprocessableUntityException;
