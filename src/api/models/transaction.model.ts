import { Prisma } from '@prisma/client';
import type { Transaction } from '@prisma/client';
import handleCurrency from '@utils/currency';
import CurrencyConverter from '@models/currency-converter.model';

interface TransactionModel {
  id: number;
  userId: number;
  baseValue: number;
  baseCurrency: string;
  quoteCurrency: string;
  conversionRate: number;
  quoteRate: number;
  createdAt: string;
}

type TransactionInput = Pick<
  TransactionModel,
  'userId' | 'baseValue' | 'baseCurrency' | 'quoteCurrency' | 'conversionRate' | 'quoteRate'
>;
type TransactionOptionalInput = Partial<TransactionInput>;

type TransactionOutput = Required<TransactionModel>;

type TransactionResponse = Omit<TransactionOutput, 'quoteRate'> & { quoteValue: number };

const transactionResponseMapper = (transaction: TransactionOutput): TransactionResponse => {
  const { quoteRate, ...rest } = transaction;

  const quoteValue = CurrencyConverter.getQuoteValue(transaction.baseValue, quoteRate);
  return { ...rest, quoteValue };
};

const transactionOutputMapper = ({
  baseValue,
  conversionRate,
  createdAt,
  quoteRate,
  ...rest
}: Transaction): TransactionOutput => ({
  ...rest,
  baseValue: baseValue.toNumber(),
  conversionRate: conversionRate.toNumber(),
  quoteRate: quoteRate.toNumber(),
  createdAt: createdAt.toISOString()
});

const transactionInputMapper = ({
  baseValue,
  conversionRate,
  quoteRate,
  ...rest
}: TransactionInput): Pick<
  Transaction,
  'userId' | 'baseValue' | 'baseCurrency' | 'quoteCurrency' | 'conversionRate' | 'quoteRate'
> => ({
  ...rest,
  baseValue: new Prisma.Decimal(handleCurrency(baseValue).value),
  conversionRate: new Prisma.Decimal(conversionRate),
  quoteRate: new Prisma.Decimal(quoteRate)
});

export {
  TransactionInput,
  TransactionOptionalInput,
  TransactionOutput,
  TransactionResponse,
  transactionOutputMapper,
  transactionInputMapper,
  transactionResponseMapper
};
