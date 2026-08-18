-- CreateTable
CREATE TABLE "expense" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "expenseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trainerId" INTEGER NOT NULL,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "expense_trainerId_idx" ON "expense"("trainerId");

-- CreateIndex
CREATE INDEX "expense_expenseDate_idx" ON "expense"("expenseDate");

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
