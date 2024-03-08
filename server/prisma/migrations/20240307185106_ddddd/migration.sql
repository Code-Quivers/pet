/*
  Warnings:

  - The `productStatus` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productStatus",
ADD COLUMN     "productStatus" "ProductStatus" NOT NULL DEFAULT 'AVAILABLE';

-- DropEnum
DROP TYPE "ProdutStatus";
