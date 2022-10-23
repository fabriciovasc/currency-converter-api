import morgan, { StreamOptions } from 'morgan';

import Logger from '@utils/logger';
import config from '@config/index';

const stream: StreamOptions = {
  write: (msg: string) => Logger.http(msg)
};

const skip = () => config.app.isDevelopment ?? true;

const MorganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', { stream, skip });

export default MorganMiddleware;
