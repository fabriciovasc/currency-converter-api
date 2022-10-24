import { Router } from 'express';
import transactionRouter from './transaction.route';
import userRouter from './user.route';

const mainRouter: Router = Router();

mainRouter.use('/transactions', transactionRouter);
mainRouter.use('/users', userRouter);

export default mainRouter;
