export enum ErrorCode {
  MISSING_FIELD = 100,
  INVALID_FIELD = 101,
  UNAVAILABLE_API_SERVICE = 102,
  TRANSACTIONS_NOT_FOUND = 103
}

enum ErrorType {
  MISSING_FIELD = 'MISSING_FIELD',
  INVALID_FIELD = 'INVALID_FIELD',
  UNAVAILABLE_API_SERVICE = 'UNAVAILABLE_API_SERVICE',
  TRANSACTIONS_NOT_FOUND = 'TRANSACTIONS_NOT_FOUND'
}

enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVICE_UNAVAILABLE = 503
}

const ErrorTypes: { [key in ErrorCode]: ErrorType } = {
  [ErrorCode.MISSING_FIELD]: ErrorType.MISSING_FIELD,
  [ErrorCode.INVALID_FIELD]: ErrorType.INVALID_FIELD,
  [ErrorCode.UNAVAILABLE_API_SERVICE]: ErrorType.UNAVAILABLE_API_SERVICE,
  [ErrorCode.TRANSACTIONS_NOT_FOUND]: ErrorType.TRANSACTIONS_NOT_FOUND
};

const ErrorHttpStatusCodes: { [key in ErrorCode]: HttpStatusCode } = {
  [ErrorCode.MISSING_FIELD]: HttpStatusCode.BAD_REQUEST,
  [ErrorCode.INVALID_FIELD]: HttpStatusCode.BAD_REQUEST,
  [ErrorCode.UNAVAILABLE_API_SERVICE]: HttpStatusCode.SERVICE_UNAVAILABLE,
  [ErrorCode.TRANSACTIONS_NOT_FOUND]: HttpStatusCode.NOT_FOUND
};

class HttpException extends Error {
  public readonly errorCode: number;

  public readonly errorType: ErrorType;
  public readonly statusCode: HttpStatusCode;

  constructor(errorCode: ErrorCode, public readonly message: string) {
    super(message);
    this.errorCode = errorCode;
    this.errorType = ErrorTypes[errorCode];
    this.statusCode = ErrorHttpStatusCodes[errorCode];
  }
}

export default HttpException;
