-- CreateEnum
CREATE TYPE "BarcodeStatus" AS ENUM ('SOLD', 'AVAILABLE', 'ACTIVE', 'DEACTIVE');

-- AlterTable
ALTER TABLE "BarCode" ADD COLUMN     "barcodeStatus" "BarcodeStatus" NOT NULL DEFAULT 'AVAILABLE';
