import { Prisma, Transaction } from '@prisma/client';
import {
  TransactionInput,
  transactionInputMapper,
  TransactionOutput,
  transactionOutputMapper,
  transactionResponseMapper
} from '@models/transaction.model';

describe('transaction model', () => {
  test('transaction output mapper', () => {
    // Given
    const transaction: Transaction = {
      id: 1,
      userId: 1,
      baseCurrency: 'BRD',
      quoteCurrency: 'USD',
      baseValue: new Prisma.Decimal(4),
      conversionRate: new Prisma.Decimal(2),
      quoteRate: new Prisma.Decimal(3),
      createdAt: new Date()
    };

    // Then
    expect(transactionOutputMapper(transaction)).toEqual(
      expect.objectContaining({
        baseValue: expect.any(Number),
        conversionRate: expect.any(Number),
        createdAt: expect.any(String)
      })
    );
  });

  test('transaction input mapper', () => {
    // Given
    const transaction: TransactionInput = {
      userId: 1,
      baseCurrency: 'BRD',
      quoteCurrency: 'USD',
      baseValue: 15,
      conversionRate: 12.5,
      quoteRate: 1.5
    };

    // Then
    expect(transactionInputMapper(transaction)).toEqual(
      expect.objectContaining({
        baseValue: expect.any(Prisma.Decimal),
        conversionRate: expect.any(Prisma.Decimal)
      })
    );
  });

  test('transaction response mapper', () => {
    // Given
    const transaction: TransactionOutput = {
      userId: 1,
      baseCurrency: 'BRD',
      quoteCurrency: 'USD',
      baseValue: 15,
      conversionRate: 12.5,
      quoteRate: 1.5,
      createdAt: new Date().toISOString(),
      id: 1
    };

    // Then
    expect(transactionResponseMapper(transaction)).toEqual(
      expect.not.objectContaining({
        quoteRate: expect.any(Number)
      })
    );
  });
});
