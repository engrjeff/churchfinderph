/*
  Warnings:

  - You are about to drop the column `photo` on the `Pastor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Pastor" DROP COLUMN "photo",
ADD COLUMN     "photoUrl" TEXT;
