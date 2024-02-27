/*
  Warnings:

  - You are about to drop the column `userRole` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "userRole",
ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT 'USER';
