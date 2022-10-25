import { Router } from 'express';
import TransactionController from '@controllers/transaction.controller';

const userRouter: Router = Router();

userRouter.route('/users/:id/transactions').get(TransactionController.getUserTransactions);

export default userRouter;
