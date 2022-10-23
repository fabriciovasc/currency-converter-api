import { Request, Response, Router } from 'express';
import TransactionController from '@controllers/transaction.controller';

const mainRouter: Router = Router();

mainRouter.route('/').get((req: Request, res: Response) => {
  res.json({
    version: 'v1'
  });
});

mainRouter.route('/currency-converter').post(TransactionController.createTransaction);

mainRouter.route('/users/:id/transactions').get(TransactionController.getUserTransactions);

export default mainRouter;
