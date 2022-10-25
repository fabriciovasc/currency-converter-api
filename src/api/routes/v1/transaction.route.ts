import { Router } from 'express';
import TransactionController from '@controllers/transaction.controller';

const transactionRouter: Router = Router();

transactionRouter.route('/transactions').post(TransactionController.createTransaction);

export default transactionRouter;
