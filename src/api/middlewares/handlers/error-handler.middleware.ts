import HttpException from '@models/http-exception.model';
import { NextFunction, Request, Response } from 'express';
import Logger from '../../../utils/logger';

interface ResponseType {
  code: number;
  type: string;
  message: string;
}

interface ErrorLog extends ResponseType {
  method: string;
  path: string;
  params: string;
  body: any;
  query: any;
}

const generateLogs = (
  error: ResponseType,
  { method, path, route: { path: params }, query, body }: Request
): ErrorLog => {
  return { ...error, method, path, params, query, body };
};

function errorHandler(err: HttpException, req: Request, res: Response, next: NextFunction) {
  let status: number;
  let response: ResponseType;

  if (!err.errorCode) {
    response = {
      code: 500,
      type: 'UNKNOWN_ERROR',
      message: 'Erro desconhecido'
    };
    status = 500;
  } else {
    const { errorCode: code, errorType: type, statusCode, message } = err;
    response = { code, type, message };
    status = statusCode;
  }

  const logs = generateLogs(response, req);
  Logger.error(JSON.stringify(logs));

  res.status(status).json(response);
}

export default errorHandler;
