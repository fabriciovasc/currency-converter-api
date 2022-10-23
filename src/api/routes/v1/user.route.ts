import { Router } from 'express';
import TransactionController from '@controllers/transaction.controller';

const userRouter: Router = Router();

userRouter.get('/:id/transactions', TransactionController.getUserTransactions);

export default userRouter;
