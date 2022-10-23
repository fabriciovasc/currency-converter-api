import type { Transaction } from '@prisma/client';

type TransactionInput = Partial<Transaction>;

type TransactionOutput = Required<Transaction>;

export { TransactionInput, TransactionOutput };
