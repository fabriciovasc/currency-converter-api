/*
  Warnings:

  - You are about to alter the column `baseCurrency` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(3)`.
  - You are about to alter the column `quoteCurrency` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(3)`.
  - You are about to alter the column `conversionRate` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(15,3)`.
  - Added the required column `quoteRate` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `baseValue` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "quoteRate" DECIMAL(15,3) NOT NULL,
ALTER COLUMN "baseCurrency" SET DATA TYPE CHAR(3),
ALTER COLUMN "quoteCurrency" SET DATA TYPE CHAR(3),
DROP COLUMN "baseValue",
ADD COLUMN     "baseValue" MONEY NOT NULL,
ALTER COLUMN "conversionRate" SET DATA TYPE DECIMAL(15,3);
