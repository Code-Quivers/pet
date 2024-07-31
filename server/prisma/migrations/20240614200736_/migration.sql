/*
  Warnings:

  - Added the required column `currency` to the `PaymentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gateWayFee` to the `PaymentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gateWayTransactionTime` to the `PaymentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `netAmount` to the `PaymentInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentInfo" ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "gateWayFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "gateWayTransactionTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "netAmount" DOUBLE PRECISION NOT NULL;
