import { Request, Response, Router } from 'express';
import mainRouter from '@routes/v1/main.route';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    version: 'v1'
  });
});

router.use('/', mainRouter);

export default router;
