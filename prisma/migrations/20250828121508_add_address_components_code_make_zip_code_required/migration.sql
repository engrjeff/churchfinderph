/*
  Warnings:

  - A unique constraint covering the columns `[slug,id]` on the table `Church` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barangayCode` to the `Church` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityCode` to the `Church` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceCode` to the `Church` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionCode` to the `Church` table without a default value. This is not possible if the table is not empty.
  - Made the column `zipCode` on table `Church` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Church" ADD COLUMN     "barangayCode" TEXT NOT NULL,
ADD COLUMN     "cityCode" TEXT NOT NULL,
ADD COLUMN     "provinceCode" TEXT NOT NULL,
ADD COLUMN     "regionCode" TEXT NOT NULL,
ALTER COLUMN "zipCode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Church_slug_id_key" ON "public"."Church"("slug", "id");
