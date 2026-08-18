-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "paymentMonth" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "memberId" INTEGER NOT NULL,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payment_memberId_idx" ON "payment"("memberId");

-- CreateIndex
CREATE INDEX "payment_paymentMonth_idx" ON "payment"("paymentMonth");

-- CreateIndex
CREATE UNIQUE INDEX "payment_memberId_paymentMonth_key" ON "payment"("memberId", "paymentMonth");

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
