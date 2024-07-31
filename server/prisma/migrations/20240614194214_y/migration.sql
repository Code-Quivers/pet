/*
  Warnings:

  - You are about to drop the column `zip` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `postalCode` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "zip",
ADD COLUMN     "postalCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "fullName",
ADD COLUMN     "displayContactInfo" BOOLEAN DEFAULT true,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;
