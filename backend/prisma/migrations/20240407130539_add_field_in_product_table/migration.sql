/*
  Warnings:

  - You are about to alter the column `preparationTime` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `accession` INTEGER NULL,
    MODIFY `preparationTime` VARCHAR(191) NOT NULL;
