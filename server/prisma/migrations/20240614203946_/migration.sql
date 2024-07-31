/*
  Warnings:

  - You are about to drop the `PaymentInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaymentInfo" DROP CONSTRAINT "PaymentInfo_orderId_fkey";

-- DropTable
DROP TABLE "PaymentInfo";

-- CreateTable
CREATE TABLE "PaumentReport" (
    "paymentId" TEXT NOT NULL,
    "gateWayTransactionId" TEXT NOT NULL,
    "gateWay" "PaymentGateway" NOT NULL,
    "totalAmountPaid" DOUBLE PRECISION NOT NULL,
    "totalAmountToPaid" DOUBLE PRECISION NOT NULL,
    "gateWayFee" DOUBLE PRECISION NOT NULL,
    "netAmount" DOUBLE PRECISION NOT NULL,
    "gateWayTransactionTime" TIMESTAMP(3) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "currency" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "PaumentReport_pkey" PRIMARY KEY ("paymentId")
);

-- AddForeignKey
ALTER TABLE "PaumentReport" ADD CONSTRAINT "PaumentReport_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;
