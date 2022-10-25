import { Request, Response, Router } from 'express';
import transactionRouter from '@routes/v1/transaction.route';
import userRouter from '@routes/v1/user.route';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    version: 'v1'
  });
});

router.use(transactionRouter);
router.use(userRouter);

export default router;
