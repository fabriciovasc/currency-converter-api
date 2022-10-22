import { TransactionInput } from '@models/transaction.model';
import HttpException, { ErrorCode } from '@models/http-exception.model';
import ExchangeRateApiService from './exchange-rate-api.service';
import CurrencyConverter from '@models/currency-converter.model';
import { Transaction } from '@prisma/client';
import prismaClient from '@database/prisma-client';

class TransactionService {
  createTransaction = async ({
    userId,
    baseCurrency,
    quoteCurrency,
    baseValue
  }: TransactionInput): Promise<Transaction & { quoteValue: number }> => {
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

    const { conversionRate, quoteValue } = new CurrencyConverter(
      baseValue as unknown as number,
      baseCurrencyValue,
      quoteCurrencyValue
    );

    const createdTransaction: Transaction = await prismaClient.transaction.create({
      data: { userId, baseCurrency, quoteCurrency, baseValue, conversionRate }
    });

    return { ...createdTransaction, quoteValue };
  };

  getTransactions = async () => {};
}

export default new TransactionService();
