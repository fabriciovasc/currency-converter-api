import express, { Application, Router } from 'express';
import cors, { CorsOptions } from 'cors';
import errorHandler from '@middlewares/handlers/error-handler.middleware';
import config from '@config/index';
import routes from './api/routes';

const createServer = (): Application => {
  const app = express();
  const corsOptions: CorsOptions = {
    origin: '*',
    credentials: false
  };

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors(corsOptions));

  const apiVersion = config.app.apiVersion || 'v1';
  const router: Router = routes[apiVersion];
  app.use(`/api/${config.app.apiVersion}`, router);

  app.use(errorHandler);

  return app;
};

export default createServer;
