/*
  Warnings:

  - You are about to drop the column `barcodeCode` on the `ProductVariation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProductVariation_barcodeCode_key";

-- AlterTable
ALTER TABLE "ProductVariation" DROP COLUMN "barcodeCode";

-- CreateTable
CREATE TABLE "BarCode" (
    "barcodeId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "BarCode_pkey" PRIMARY KEY ("barcodeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "BarCode_code_key" ON "BarCode"("code");

-- AddForeignKey
ALTER TABLE "BarCode" ADD CONSTRAINT "BarCode_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariation"("variantId") ON DELETE RESTRICT ON UPDATE CASCADE;
