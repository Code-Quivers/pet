-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_sizeVarientId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "sizeVarientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_sizeVarientId_fkey" FOREIGN KEY ("sizeVarientId") REFERENCES "SizeVarient"("sizeVarientId") ON DELETE SET NULL ON UPDATE CASCADE;
