import { Request, Response, NextFunction } from 'express';
import TransactionService from '@services/transaction.service';

class TransactionController {
  async createTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await TransactionService.createTransaction(req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  async getUserTransactions(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const userId = Number(id);
      const result = await TransactionService.getTransactionsByUserId(userId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();
