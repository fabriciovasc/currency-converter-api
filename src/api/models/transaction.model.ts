import { Prisma } from '@prisma/client';
import type { Transaction } from '@prisma/client';
import handleCurrency from '@utils/currency';

interface TransactionModel {
  id: number;
  userId: number;
  baseValue: number;
  baseCurrency: string;
  quoteCurrency: string;
  conversionRate: number;
  createdAt: string;
}

type TransactionInput = Pick<
  TransactionModel,
  'userId' | 'baseValue' | 'baseCurrency' | 'quoteCurrency' | 'conversionRate'
>;
type TransactionOptionalInput = Partial<TransactionInput>;

type TransactionOutput = Required<TransactionModel>;

const transactionOutputMapper = ({
  baseValue,
  conversionRate,
  createdAt,
  ...rest
}: Transaction): TransactionOutput => ({
  ...rest,
  baseValue: baseValue.toNumber(),
  conversionRate: conversionRate.toNumber(),
  createdAt: createdAt.toISOString()
});

const transactionInputMapper = ({
  baseValue,
  conversionRate,
  ...rest
}: TransactionInput): Pick<
  Transaction,
  'userId' | 'baseValue' | 'baseCurrency' | 'quoteCurrency' | 'conversionRate'
> => ({
  ...rest,
  baseValue: new Prisma.Decimal(handleCurrency(baseValue).value),
  conversionRate: new Prisma.Decimal(conversionRate)
});

export {
  TransactionInput,
  TransactionOptionalInput,
  TransactionOutput,
  transactionOutputMapper,
  transactionInputMapper
};
