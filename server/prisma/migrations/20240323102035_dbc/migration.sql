/*
  Warnings:

  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_productId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProductQA" DROP CONSTRAINT "ProductQA_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariation" DROP CONSTRAINT "ProductVariation_productId_fkey";

-- AlterTable
ALTER TABLE "ProductQA" ALTER COLUMN "productId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariation" ALTER COLUMN "productId" DROP NOT NULL;

-- DropTable
DROP TABLE "Pet";

-- CreateTable
CREATE TABLE "KidDetails" (
    "kidId" TEXT NOT NULL,
    "kidName" TEXT NOT NULL,
    "kidImage" TEXT NOT NULL,
    "kidGender" TEXT NOT NULL,
    "petAddress" TEXT NOT NULL,
    "kidFathername" TEXT,
    "kidFatherphone" TEXT,
    "kidMothername" TEXT,
    "kidMotherphone" TEXT,
    "kidUnclename" TEXT,
    "kidUnclephone" TEXT,
    "kidAuntname" TEXT,
    "kidAuntphone" TEXT,
    "kidFriendname" TEXT,
    "kidFriendphone" TEXT,
    "userId" TEXT NOT NULL,
    "productId" TEXT,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "KidDetails_pkey" PRIMARY KEY ("kidId")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "testimonialId" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientImage" TEXT NOT NULL,
    "testimonialTitle" TEXT NOT NULL,
    "testimonialDescription" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("testimonialId")
);

-- CreateIndex
CREATE UNIQUE INDEX "KidDetails_productId_key" ON "KidDetails"("productId");

-- AddForeignKey
ALTER TABLE "ProductVariation" ADD CONSTRAINT "ProductVariation_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQA" ADD CONSTRAINT "ProductQA_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KidDetails" ADD CONSTRAINT "KidDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KidDetails" ADD CONSTRAINT "KidDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE SET NULL ON UPDATE CASCADE;
