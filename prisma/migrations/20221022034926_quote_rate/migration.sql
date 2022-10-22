/*
  Warnings:

  - Added the required column `quoteRate` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "baseCurrency" TEXT NOT NULL,
    "quoteCurrency" TEXT NOT NULL,
    "baseValue" DECIMAL NOT NULL,
    "conversionRate" DECIMAL NOT NULL,
    "quoteRate" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_transactions" ("baseCurrency", "baseValue", "conversionRate", "createdAt", "id", "quoteCurrency", "userId") SELECT "baseCurrency", "baseValue", "conversionRate", "createdAt", "id", "quoteCurrency", "userId" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
