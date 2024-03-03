/*
  Warnings:

  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[categoryName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryHref]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryHref` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductQA" DROP CONSTRAINT "ProductQA_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductReview" DROP CONSTRAINT "ProductReview_productId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "categoryHref" TEXT NOT NULL;

-- DropTable
DROP TABLE "product";

-- CreateTable
CREATE TABLE "Product" (
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productImage" TEXT NOT NULL,
    "productPrice" DOUBLE PRECISION NOT NULL,
    "productStock" INTEGER NOT NULL,
    "productDescription" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "colorVarientId" TEXT NOT NULL,
    "sizeVarientId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "ColorVarient" (
    "colorVarientId" TEXT NOT NULL,
    "productColor" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "ColorVarient_pkey" PRIMARY KEY ("colorVarientId")
);

-- CreateTable
CREATE TABLE "SizeVarient" (
    "sizeVarientId" TEXT NOT NULL,
    "productSize" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "SizeVarient_pkey" PRIMARY KEY ("sizeVarientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_productName_key" ON "Product"("productName");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryHref_key" ON "Category"("categoryHref");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_colorVarientId_fkey" FOREIGN KEY ("colorVarientId") REFERENCES "ColorVarient"("colorVarientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sizeVarientId_fkey" FOREIGN KEY ("sizeVarientId") REFERENCES "SizeVarient"("sizeVarientId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQA" ADD CONSTRAINT "ProductQA_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;
