import { Router } from 'express';
import TransactionController from '@controllers/transaction.controller';

const transactionRouter: Router = Router();

transactionRouter.post('/', TransactionController.createTransaction);

export default transactionRouter;
