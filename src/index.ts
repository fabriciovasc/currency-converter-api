import * as dotenv from 'dotenv';

import { Server } from 'net';
import createServer from './server';
import config from './config';
import Logger from './utils/logger';

dotenv.config();

const SERVER_PORT = config.app.port;

const startServer = (): Server => {
  const app = createServer();

  return app.listen(SERVER_PORT, () => {
    Logger.debug(`App ${config.app.name} with api version ${config.app.apiVersion} is starting on port ${SERVER_PORT}`);
  });
};

startServer();
