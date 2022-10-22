/*
  Warnings:

  - You are about to drop the column `currencyFrom` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `currencyTo` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `valueFrom` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `baseCurrency` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseValue` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quoteCurrency` to the `transactions` table without a default value. This is not possible if the table is not empty.

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_transactions" ("conversionRate", "createdAt", "id", "userId") SELECT "conversionRate", "createdAt", "id", "userId" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
