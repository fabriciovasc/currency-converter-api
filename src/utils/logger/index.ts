import winston from 'winston';

import config from '@config/index';
import { AbstractConfigSetColors } from 'winston/lib/winston/config';

const levels: { [key: string]: number } = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const level = () => {
  return (config.app.isDevelopment && 'debug') || 'warn';
};

const colors: AbstractConfigSetColors = {
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  http: 'magenta',
  debug: 'green'
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, message, level }) => `${timestamp} ${level}: ${message}`)
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  }),
  new winston.transports.File({ filename: 'logs/all_errors.log' })
];

const loggerOptions: winston.LoggerOptions = {
  level: level(),
  levels,
  format,
  transports
};

const Logger: winston.Logger = winston.createLogger(loggerOptions);

export default Logger;
