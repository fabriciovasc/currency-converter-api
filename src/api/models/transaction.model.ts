import type { Transaction } from '@prisma/client';

type TransactionInput = Pick<Transaction, 'userId' | 'baseCurrency' | 'quoteCurrency' | 'baseValue'>;

export { Transaction, TransactionInput };
