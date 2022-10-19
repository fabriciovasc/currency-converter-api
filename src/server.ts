import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';

const createServer = (): Application => {
  const app = express();
  const corsOptions: CorsOptions = {
    origin: '*',
    credentials: false
  };

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors(corsOptions));

  return app;
};

export default createServer;
