/*
  Warnings:

  - You are about to drop the column `barangayCode` on the `Church` table. All the data in the column will be lost.
  - You are about to drop the column `cityCode` on the `Church` table. All the data in the column will be lost.
  - You are about to drop the column `provinceCode` on the `Church` table. All the data in the column will be lost.
  - You are about to drop the column `regionCode` on the `Church` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Church" DROP COLUMN "barangayCode",
DROP COLUMN "cityCode",
DROP COLUMN "provinceCode",
DROP COLUMN "regionCode";
