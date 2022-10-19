import { Server } from 'net';
import createServer from './server';

const startServer = (): Server => {
  const app = createServer();

  return app.listen(8090, () => {
    console.log(`Server is listening on port ${8090}`);
  });
};

startServer();
