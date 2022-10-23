import { Request, Response, Router } from 'express';
import currencyConverterRouter from './currency-converter.route';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    version: 'v1'
  });
});

router.use('/currency-converter', currencyConverterRouter);

export default router;
