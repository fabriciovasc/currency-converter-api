import createServer from '../../src/server';
import supertest from 'supertest';
import prismaClient from '@database/prisma-client';
import ExchangeRateApiService from '@services/exchange-rate-api.service';
import { mockGetExchangeRates } from '@services/__mocks__/exchange-rate-api.service';

const app = createServer();

const request = supertest(app);

const mocked = jest.mocked;
jest.mock('@services/exchange-rate-api.service');

const exchangeRateApiMock = mocked(new ExchangeRateApiService());

beforeEach(async () => {
  await prismaClient.transaction.deleteMany({});
  exchangeRateApiMock.getExchangeRates.mockRestore();
});

describe('transaction controller', () => {
  describe('GET /currency-converter/users/:id/transactions', () => {
    test('should raise bad request when invalid user id', async () => {
      // Given
      const userId = 'foo';

      await request.get(`/api/v1/currency-converter/users/${userId}/transactions`).expect(400, {
        code: 101,
        type: 'INVALID_FIELD',
        message: `Invalid userId for get transactions`
      });
    });

    test('should raise not found when unregistered transactions', async () => {
      // Given
      const userId = 1;

      await request.get(`/api/v1/currency-converter/users/${userId}/transactions`).expect(404, {
        code: 103,
        type: 'TRANSACTIONS_NOT_FOUND',
        message: `Transactions not found for userId ${userId}`
      });
    });

    test('should raise not found when not found user transactions', async () => {
      // Given
      const otherUserTransaction = {
        userId: 2,
        baseCurrency: 'BRL',
        quoteCurrency: 'USD',
        quoteRate: 1,
        baseValue: 10,
        conversionRate: 3
      };

      // When
      await prismaClient.transaction.create({
        data: otherUserTransaction
      });

      // Then
      const userId = 1;
      await request.get(`/api/v1/currency-converter/users/${userId}/transactions`).expect(404, {
        code: 103,
        type: 'TRANSACTIONS_NOT_FOUND',
        message: `Transactions not found for userId ${userId}`
      });
    });

    test('should return transactions', async () => {
      // Given
      const transaction = {
        userId: 1,
        baseValue: 10,
        baseCurrency: 'BRD',
        quoteCurrency: 'USD',
        quoteRate: 1,
        conversionRate: 2
      };

      // When
      await prismaClient.transaction.create({
        data: transaction
      });

      // Then
      const response = await request
        .get(`/api/v1/currency-converter/users/${transaction.userId}/transactions`)
        .expect(200);
      const transactions = response.body;
      expect(transactions).toHaveLength(1);
    });
  });

  describe('POST /currency-converter/transactions', () => {
    test('should raise bad request when missing field', async () => {
      // Given
      const transaction = {
        userId: null
      };

      // Then
      await request
        .post('/api/v1/currency-converter/transactions')
        .set('Content-Type', 'application/json')
        .send(transaction)
        .expect(400, {
          code: 100,
          type: 'MISSING_FIELD',
          message: 'userId is required'
        });
    });

    test('should raise bad request when invalid field', async () => {
      // Given
      const transaction = {
        userId: 1,
        baseValue: 10,
        baseCurrency: 'NAS',
        quoteCurrency: 'USD'
      };

      // Then
      await request
        .post('/api/v1/currency-converter/transactions')
        .set('Content-Type', 'application/json')
        .send(transaction)
        .expect(400, {
          code: 101,
          type: 'INVALID_FIELD',
          message: `Invalid baseCurrency ${transaction.baseCurrency} for conversion`
        });
    });

    test('should raise bad request when unavailable exchange rate api service', async () => {
      // Given
      const transaction = {
        userId: 1,
        baseValue: 10,
        baseCurrency: 'NAS',
        quoteCurrency: 'USD'
      };

      // When
      exchangeRateApiMock.getExchangeRates.mockRejectedValue(new Error());

      // Then
      await request
        .post('/api/v1/currency-converter/transactions')
        .set('Content-Type', 'application/json')
        .send(transaction)
        .expect(503, {
          code: 102,
          type: 'UNAVAILABLE_API_SERVICE',
          message: 'External API error'
        });
    });

    test('should return transaction', async () => {
      // Given
      const transaction = {
        userId: 1,
        baseValue: 10,
        baseCurrency: 'BRL',
        quoteCurrency: 'USD'
      };

      // When
      exchangeRateApiMock.getExchangeRates.mockResolvedValue(mockGetExchangeRates());

      // Then
      await request
        .post('/api/v1/currency-converter/transactions')
        .set('Content-Type', 'application/json')
        .send(transaction)
        .expect(200);
    });
  });
});
