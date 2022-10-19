-- CreateTable
CREATE TABLE "transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "currencyFrom" TEXT NOT NULL,
    "currencyTo" TEXT NOT NULL,
    "valueFrom" DECIMAL NOT NULL,
    "conversionRate" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
