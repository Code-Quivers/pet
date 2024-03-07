-- CreateEnum
CREATE TYPE "ProdutStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productStatus" "ProdutStatus" NOT NULL DEFAULT 'AVAILABLE';
