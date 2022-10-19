import express, { Application } from 'express';

const createServer = (): Application => {
  const app = express();

  return app;
};

export default createServer;
