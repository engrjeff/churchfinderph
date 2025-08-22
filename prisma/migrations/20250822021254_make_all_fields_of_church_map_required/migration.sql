/*
  Warnings:

  - Made the column `latitude` on table `ChurchMap` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `ChurchMap` required. This step will fail if there are existing NULL values in that column.
  - Made the column `addressInMap` on table `ChurchMap` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."ChurchMap" ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL,
ALTER COLUMN "addressInMap" SET NOT NULL;
