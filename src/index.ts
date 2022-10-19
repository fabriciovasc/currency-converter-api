import { Server } from 'net';
import createServer from './server';
import appConfig from './config';

const startServer = (): Server => {
  const app = createServer();

  return app.listen(appConfig.app.port, () => {
    console.log(`Server is listening on port ${appConfig.app.port}`);
  });
};

startServer();
