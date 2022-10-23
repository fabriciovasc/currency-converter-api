import { Router } from 'express';
import transactionRouter from './transaction.route';
import userRouter from './user.route';

const currencyConverterRouter: Router = Router();

currencyConverterRouter.use('/transactions', transactionRouter);
currencyConverterRouter.use('/users', userRouter);

export default currencyConverterRouter;
