import { TransactionInput } from '@models/transaction.model';
import HttpException, { ErrorCode } from '@models/http-exception.model';
import ExchangeRateApiService from './exchange-rate-api.service';
import CurrencyConverter from '@models/currency-converter.model';
import { Transaction } from '@prisma/client';
import prismaClient from '@database/prisma-client';

type TransactionResponse = Transaction & { quoteValue: number };

class TransactionService {
  createTransaction = async ({
    userId,
    baseCurrency,
    quoteCurrency,
    baseValue
  }: TransactionInput): Promise<TransactionResponse> => {
    if (!userId) {
      throw new HttpException(ErrorCode.MISSING_FIELD, 'userId is required');
    }

    if (userId <= 0) {
      throw new HttpException(ErrorCode.INVALID_FIELD, 'userId must be greater than zero');
    }

    if (!baseCurrency) {
      throw new HttpException(ErrorCode.MISSING_FIELD, 'baseCurrency is required');
    }

    if (!quoteCurrency) {
      throw new HttpException(ErrorCode.MISSING_FIELD, 'quoteCurrency is required');
    }

    if (!baseValue) {
      throw new HttpException(ErrorCode.MISSING_FIELD, 'baseValue is required');
    }

    const exchangeRateApi = new ExchangeRateApiService();
    const exchangeRates = await exchangeRateApi.getExchangeRates();

    const baseCurrencyValue = exchangeRates?.[baseCurrency];
    if (!baseCurrencyValue) {
      throw new HttpException(ErrorCode.INVALID_FIELD, `Invalid baseCurrency ${baseCurrency} for conversion`);
    }

    const quoteCurrencyValue = exchangeRates?.[quoteCurrency];
    if (!quoteCurrencyValue) {
      throw new HttpException(ErrorCode.INVALID_FIELD, `Invalid quoteCurrency ${quoteCurrency} for conversion`);
    }

    const { conversionRate, quoteValue, quoteRate } = new CurrencyConverter(
      baseValue as unknown as number,
      baseCurrencyValue,
      quoteCurrencyValue
    );

    const createdTransaction: Transaction = await prismaClient.transaction.create({
      data: { userId, baseCurrency, quoteCurrency, baseValue, conversionRate, quoteRate }
    });

    return { ...createdTransaction, quoteValue };
  };

  getTransactionsByUserId = async (userId: number): Promise<TransactionResponse[]> => {
    if (!userId || userId <= 0) {
      throw new HttpException(ErrorCode.INVALID_FIELD, `Invalid userId ${userId} for get transactions`);
    }

    const userTransactions: Transaction[] = await prismaClient.transaction.findMany({
      where: { userId }
    });

    if (!userTransactions || !userTransactions.length) {
      throw new HttpException(ErrorCode.TRANSACTIONS_NOT_FOUND, `Transactions not found for userId ${userId}`);
    }

    const userTransactionsWithQuoteValue: TransactionResponse[] = userTransactions.map(
      ({ baseValue, quoteRate, ...rest }) => {
        const quoteValue = CurrencyConverter.getQuote(baseValue as unknown as number, quoteRate as unknown as number);
        return { ...rest, baseValue, quoteRate, quoteValue };
      }
    );

    return userTransactionsWithQuoteValue;
  };
}

export default new TransactionService();
