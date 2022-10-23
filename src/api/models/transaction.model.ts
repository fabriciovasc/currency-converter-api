import { Prisma } from '@prisma/client';
import type { Transaction } from '@prisma/client';

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
  'userId' | 'baseValue' | 'baseCurrency' | 'quoteCurrency' | 'quoteRate' | 'conversionRate'
>;
type TransactionOptionalInput = Partial<TransactionInput>;

type TransactionOutput = Required<TransactionModel>;

const transactionOutputMapper = ({
  baseValue,
  conversionRate,
  quoteRate,
  createdAt,
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
  quoteRate,
  conversionRate,
  ...rest
}: TransactionInput): Pick<
  Transaction,
  'userId' | 'baseValue' | 'baseCurrency' | 'quoteCurrency' | 'quoteRate' | 'conversionRate'
> => ({
  ...rest,
  baseValue: new Prisma.Decimal(baseValue),
  quoteRate: new Prisma.Decimal(quoteRate),
  conversionRate: new Prisma.Decimal(conversionRate)
});

export {
  TransactionInput,
  TransactionOptionalInput,
  TransactionOutput,
  transactionOutputMapper,
  transactionInputMapper
};
