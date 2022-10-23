import express, { Application, Router } from 'express';
import cors, { CorsOptions } from 'cors';
import errorHandler from '@middlewares/handlers/error-handler.middleware';
import config from '@config/index';
import MorganMiddleware from '@middlewares/morgan/morgan.middleware';
import routes from '@routes/index';
import swagger from 'swagger-ui-express';
import { specs } from './utils/swagger';

const createServer = (): Application => {
  const app = express();
  const corsOptions: CorsOptions = {
    origin: '*',
    credentials: false
  };

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(MorganMiddleware);

  app.get('/', (req: Request, res: Response) => {
    const name = 'Currency Converter API';
    res.status(200).json({
      name
    });
  });

  const apiVersion = config.app.apiVersion || 'v1';
  const router: Router = routes[apiVersion];
  app.use(`/api/${config.app.apiVersion}`, router);

  if (config.app.isDevelopment) {
    // swagger api doc
    app.use(`/docs/${apiVersion}`, swagger.serve, swagger.setup(specs));
  }

  app.use(errorHandler);

  return app;
};

export default createServer;
