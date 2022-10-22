import TransactionService from '@services/transaction.service';
import prismaMock from '../../prisma-mock';

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
        baseValue: 10
      };

      const mockedTransaction: any = {
        ...transaction,
        id: 1,
        conversionRate: 2,
        createdAt: new Date()
      };

      // When
      prismaMock.transaction.create.mockResolvedValue(mockedTransaction);

      // Then
      await expect(TransactionService.createTransaction(transaction)).resolves.toHaveProperty('quoteValue');
    });
  });
});
