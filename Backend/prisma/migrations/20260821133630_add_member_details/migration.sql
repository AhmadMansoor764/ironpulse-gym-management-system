-- DropIndex
DROP INDEX "expense_expenseDate_idx";

-- DropIndex
DROP INDEX "expense_trainerId_idx";

-- AlterTable
ALTER TABLE "member" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "diet" TEXT,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "trainer" ADD COLUMN     "resetCode" TEXT,
ADD COLUMN     "resetCodeExpiry" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "expense_trainerId_expenseDate_idx" ON "expense"("trainerId", "expenseDate");
