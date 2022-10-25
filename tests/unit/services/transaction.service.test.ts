import TransactionService from '@services/transaction.service';
import { Prisma } from '@prisma/client';
import prismaMock from '../../config/setup/prisma-mock';

jest.mock('@services/exchange-rate-api.service');

describe('transaction service', () => {
  describe('create transaction', () => {
    test('should throw an error when creating transaction with empty userId', async () => {
      // Given
      const transaction: any = {
        userId: null,
        baseCurrency: 'USD',
        quoteCurrency: 'BRL',
        baseValue: 10
      };

      // Then
      await expect(TransactionService.createTransaction(transaction)).rejects.toThrowError('userId is required');
    });

    test('should throw an error when creating transaction with empty baseCurrency', async () => {
      // Given
      const transaction: any = {
        userId: 1,
        baseCurrency: '',
        quoteCurrency: 'BRL',
        baseValue: 10
      };

      // Then
      await expect(TransactionService.createTransaction(transaction)).rejects.toThrowError('baseCurrency is required');
    });

    test('should throw an error when creating transaction with empty quoteCurrency', async () => {
      // Given
      const transaction: any = {
        userId: 1,
        baseCurrency: 'USD',
        quoteCurrency: '',
        baseValue: 10
      };

      // Then
      await expect(TransactionService.createTransaction(transaction)).rejects.toThrowError('quoteCurrency is required');
    });

    test('should throw an error when creating transaction with empty baseValue', async () => {
      // Given
      const transaction: any = {
        userId: 1,
        baseCurrency: 'USD',
        quoteCurrency: 'BRL',
        baseValue: null
      };

      // Then
      await expect(TransactionService.createTransaction(transaction)).rejects.toThrowError('baseValue is required');
    });

    test('should throw an error when creating transaction with invalid userId', async () => {
      // Given
      const transaction: any = {
        userId: -1,
        baseCurrency: 'USD',
        quoteCurrency: 'BRL',
        baseValue: 10
      };

      // Then
      await expect(TransactionService.createTransaction(transaction)).rejects.toThrowError(
        'userId must be greater than zero'
      );
    });

    test('should throw an error when creating transaction with invalid baseValue', async () => {
      // Given
      const transaction: any = {
        userId: 1,
        baseCurrency: 'USD',
        quoteCurrency: 'BRL',
        baseValue: -10
      };

      // Then
      await expect(TransactionService.createTransaction(transaction)).rejects.toThrowError(
        'baseValue must be greater than zero'
      );
    });

    test('should throw an error when creating transaction with invalid baseCurrency currency', async () => {
      // Given
      const transaction: any = {
        userId: 1,
        baseCurrency: 'WER',
        quoteCurrency: 'BRL',
        baseValue: 10
      };

      // Then
      await expect(TransactionService.createTransaction(transaction)).rejects.toThrowError(
        `Invalid baseCurrency ${transaction.baseCurrency} for conversion`
      );
    });

    test('should throw an error when creating transaction with invalid quoteCurrency currency', async () => {
      // Given
      const transaction: any = {
        userId: 1,
        baseCurrency: 'BRL',
        quoteCurrency: 'WER',
        baseValue: 10
      };

      // Then
      await expect(TransactionService.createTransaction(transaction)).rejects.toThrowError(
        `Invalid quoteCurrency ${transaction.quoteCurrency} for conversion`
      );
    });

    test('should return transaction with converted valueTo', async () => {
      // Given
      const transaction: any = {
        userId: 1,
        baseCurrency: 'BRL',
        quoteCurrency: 'USD',
        baseValue: 1
      };

      const mockedTransaction: any = {
        ...transaction,
        id: 1,
        baseValue: new Prisma.Decimal(transaction.baseValue),
        conversionRate: new Prisma.Decimal(2),
        quoteRate: new Prisma.Decimal(4),
        createdAt: new Date()
      };

      // When
      prismaMock.transaction.create.mockResolvedValue(mockedTransaction);

      // Then
      await expect(TransactionService.createTransaction(transaction)).resolves.toHaveProperty('quoteValue');
    });
  });

  describe('get transactions by user id', () => {
    test('should throw an error when get transactions without user id', async () => {
      // Given
      const userId = -1;

      // Then
      await expect(TransactionService.getTransactionsByUserId(userId)).rejects.toThrowError(
        `Invalid userId for get transactions`
      );
    });

    test('should throw an error when not found transactions', async () => {
      // Given
      const userId = 1;

      // When
      prismaMock.transaction.findMany.mockResolvedValue([]);

      // Then
      await expect(TransactionService.getTransactionsByUserId(userId)).rejects.toThrowError(
        `Transactions not found for userId ${userId}`
      );
    });

    test('should return user transactions with quoteValue', async () => {
      // Given
      const userId = 1;
      const mockedTransaction1: any = {
        userId,
        baseCurrency: 'BRL',
        quoteCurrency: 'USD',
        baseValue: new Prisma.Decimal(10),
        conversionRate: new Prisma.Decimal(3),
        quoteRate: new Prisma.Decimal(2),
        createdAt: new Date()
      };

      const mockedTransaction2: any = {
        userId,
        baseCurrency: 'JPY',
        quoteCurrency: 'USD',
        baseValue: new Prisma.Decimal(3),
        conversionRate: new Prisma.Decimal(1),
        quoteRate: new Prisma.Decimal(1.5),
        createdAt: new Date()
      };

      const mockedTransactions: any = [mockedTransaction1, mockedTransaction2];

      // When
      prismaMock.transaction.findMany.mockResolvedValue(mockedTransactions);

      // Then
      await expect(TransactionService.getTransactionsByUserId(userId)).resolves.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            quoteValue: expect.any(Number)
          })
        ])
      );
    });
  });
});
