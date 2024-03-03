/*
  Warnings:

  - You are about to drop the column `petGendar` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `petGender` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "petGendar",
ADD COLUMN     "petGender" TEXT NOT NULL;
