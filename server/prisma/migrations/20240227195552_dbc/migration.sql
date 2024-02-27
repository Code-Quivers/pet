/*
  Warnings:

  - You are about to drop the column `fullName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "fullName",
ADD COLUMN     "aunt" TEXT,
ADD COLUMN     "auntPhoneNumber" TEXT,
ADD COLUMN     "father" TEXT,
ADD COLUMN     "fatherPhoneNumber" TEXT,
ADD COLUMN     "friend" TEXT,
ADD COLUMN     "friendPhoneNumber" TEXT,
ADD COLUMN     "grandFather" TEXT,
ADD COLUMN     "grandFatherPhoneNumber" TEXT,
ADD COLUMN     "grandMother" TEXT,
ADD COLUMN     "grandMotherPhoneNumber" TEXT,
ADD COLUMN     "mother" TEXT,
ADD COLUMN     "motherPhoneNumber" TEXT,
ADD COLUMN     "uncle" TEXT,
ADD COLUMN     "unclePhoneNumber" TEXT,
ALTER COLUMN "mobileNumber" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "fullName" TEXT;
