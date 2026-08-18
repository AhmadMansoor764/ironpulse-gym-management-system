/*
  Warnings:

  - Added the required column `trainerId` to the `member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expense" ALTER COLUMN "expenseDate" DROP DEFAULT;

-- AlterTable
ALTER TABLE "member" ADD COLUMN     "trainerId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "member_trainerId_idx" ON "member"("trainerId");

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
