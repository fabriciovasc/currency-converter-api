import HttpException from '@models/http-exception.model';
import { NextFunction, Request, Response } from 'express';

interface ResponseType {
  code: number;
  type: string;
  message: string;
}

function errorHandler(err: HttpException, req: Request, res: Response, next: NextFunction) {
  if (!err.errorCode) {
    const unknownResponse: ResponseType = {
      code: 500,
      type: 'UNKNOWN_ERROR',
      message: 'Erro desconhecido'
    };
    res.status(500).json(unknownResponse);
  } else {
    const { errorCode: code, errorType: type, statusCode, message } = err;

    // TODO: Add logger constructor

    const response = { code, type, message };
    res.status(statusCode).json(response);
  }
}

export default errorHandler;
