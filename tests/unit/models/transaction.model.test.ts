import { Prisma, Transaction } from '@prisma/client';
import { transactionOutputMapper } from '@models/transaction.model';

describe('transaction model', () => {
  test('transaction output mapper', () => {
    // Given
    const transaction: Transaction = {
      id: 1,
      userId: 1,
      baseCurrency: 'BRD',
      quoteCurrency: 'USD',
      baseValue: new Prisma.Decimal(4),
      quoteRate: new Prisma.Decimal(1),
      conversionRate: new Prisma.Decimal(2),
      createdAt: new Date()
    };

    // Then
    expect(transactionOutputMapper(transaction)).toEqual(
      expect.objectContaining({
        baseValue: expect.any(Number),
        quoteRate: expect.any(Number),
        conversionRate: expect.any(Number),
        createdAt: expect.any(String)
      })
    );
  });
});
