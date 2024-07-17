/*
  Warnings:

  - You are about to drop the column `location` on the `product_media` table. All the data in the column will be lost.
  - You are about to drop the column `mimeType` on the `product_media` table. All the data in the column will be lost.
  - You are about to drop the column `originalName` on the `product_media` table. All the data in the column will be lost.
  - Added the required column `filename` to the `product_media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metadata` to the `product_media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_media` DROP COLUMN `location`,
    DROP COLUMN `mimeType`,
    DROP COLUMN `originalName`,
    ADD COLUMN `filename` VARCHAR(191) NOT NULL,
    ADD COLUMN `metadata` VARCHAR(191) NOT NULL;
