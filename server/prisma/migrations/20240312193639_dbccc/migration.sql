/*
  Warnings:

  - You are about to drop the column `colorVarientId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productCode` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productStock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `sizeVarientId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ColorVarient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SizeVarient` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PromotionType" AS ENUM ('BUY_ONE_GET_ONE', 'DISCOUNT_BASED_ON_AMOUNT');

-- CreateEnum
CREATE TYPE "RuleType" AS ENUM ('BUY_ONE_GET_ONE', 'DISCOUNT_BASED_ON_AMOUNT');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_colorVarientId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sizeVarientId_fkey";

-- DropIndex
DROP INDEX "Product_productCode_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "colorVarientId",
DROP COLUMN "productCode",
DROP COLUMN "productStock",
DROP COLUMN "sizeVarientId";

-- DropTable
DROP TABLE "ColorVarient";

-- DropTable
DROP TABLE "SizeVarient";

-- CreateTable
CREATE TABLE "ProductVariation" (
    "variantId" TEXT NOT NULL,
    "barcodeCode" TEXT NOT NULL,
    "variantPrice" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductVariation_pkey" PRIMARY KEY ("variantId")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "promotionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "PromotionType" NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("promotionId")
);

-- CreateTable
CREATE TABLE "PromotionRule" (
    "id" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "type" "RuleType" NOT NULL,
    "buy" INTEGER,
    "get" INTEGER,
    "threshold" DOUBLE PRECISION,
    "discount" DOUBLE PRECISION,

    CONSTRAINT "PromotionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToPromotion" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariation_barcodeCode_key" ON "ProductVariation"("barcodeCode");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToPromotion_AB_unique" ON "_ProductToPromotion"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToPromotion_B_index" ON "_ProductToPromotion"("B");

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionRule" ADD CONSTRAINT "PromotionRule_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("promotionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToPromotion" ADD CONSTRAINT "_ProductToPromotion_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToPromotion" ADD CONSTRAINT "_ProductToPromotion_B_fkey" FOREIGN KEY ("B") REFERENCES "Promotion"("promotionId") ON DELETE CASCADE ON UPDATE CASCADE;
