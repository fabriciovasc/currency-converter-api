import * as dotenv from 'dotenv';

import { Server } from 'net';
import createServer from './server';
import config from './config';

dotenv.config();

const SERVER_PORT = config.app.port;

const startServer = (): Server => {
  const app = createServer();

  return app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port ${SERVER_PORT}`);
  });
};

startServer();
