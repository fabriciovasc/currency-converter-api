import {
  TransactionInput,
  transactionInputMapper,
  TransactionOptionalInput,
  TransactionOutput,
  transactionOutputMapper
} from '@models/transaction.model';
import HttpException, { ErrorCode } from '@models/http-exception.model';
import ExchangeRateApiService from './exchange-rate-api.service';
import CurrencyConverter from '@models/currency-converter.model';
import { Transaction } from '@prisma/client';
import prismaClient from '@database/prisma-client';

type TransactionResponse = TransactionOutput & { quoteValue: number };

class TransactionService {
  createTransaction = async ({
    userId,
    baseCurrency,
    quoteCurrency,
    baseValue
  }: TransactionOptionalInput): Promise<TransactionResponse> => {
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

    let exchangeRates: { [key: string]: number };
    try {
      exchangeRates = await exchangeRateApi.getExchangeRates([baseCurrency, quoteCurrency]);
    } catch (error: any) {
      throw new HttpException(ErrorCode.UNAVAILABLE_API_SERVICE, error?.message || 'External API error');
    }

    const baseCurrencyValue = exchangeRates?.[baseCurrency];
    if (!baseCurrencyValue) {
      throw new HttpException(ErrorCode.INVALID_FIELD, `Invalid baseCurrency ${baseCurrency} for conversion`);
    }

    const quoteCurrencyValue = exchangeRates?.[quoteCurrency];
    if (!quoteCurrencyValue) {
      throw new HttpException(ErrorCode.INVALID_FIELD, `Invalid quoteCurrency ${quoteCurrency} for conversion`);
    }

    const { conversionRate, quoteValue, quoteRate } = new CurrencyConverter(
      baseValue,
      baseCurrencyValue,
      quoteCurrencyValue
    );

    const transactionToSave: TransactionInput = {
      userId,
      baseValue,
      baseCurrency,
      quoteCurrency,
      conversionRate,
      quoteRate
    };
    const createdTransaction: Transaction = await prismaClient.transaction.create({
      data: transactionInputMapper(transactionToSave)
    });

    const transactionToReturn: TransactionOutput = transactionOutputMapper(createdTransaction);
    return { ...transactionToReturn, quoteValue };
  };

  getTransactionsByUserId = async (userId: number): Promise<TransactionResponse[]> => {
    if (Number.isNaN(userId) || userId <= 0) {
      throw new HttpException(ErrorCode.INVALID_FIELD, `Invalid userId for get transactions`);
    }

    const userTransactions: Transaction[] = await prismaClient.transaction.findMany({
      where: { userId }
    });

    if (!userTransactions || !userTransactions.length) {
      throw new HttpException(ErrorCode.TRANSACTIONS_NOT_FOUND, `Transactions not found for userId ${userId}`);
    }

    const userTransactionsWithQuoteValue: TransactionResponse[] = userTransactions.map((transaction) => {
      const { baseValue, quoteRate, ...rest } = transactionOutputMapper(transaction);
      const quoteValue = CurrencyConverter.getQuote(baseValue, quoteRate);
      return { ...rest, baseValue, quoteRate, quoteValue };
    });

    return userTransactionsWithQuoteValue;
  };
}

export default new TransactionService();
