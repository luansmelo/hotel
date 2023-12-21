/*
  Warnings:

  - You are about to drop the column `measurementUnit` on the `inputsOnProducts` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `inputsOnProducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inputsOnProducts` DROP COLUMN `measurementUnit`,
    DROP COLUMN `unitPrice`;

-- AlterTable
ALTER TABLE `product` MODIFY `description` VARCHAR(1000) NOT NULL;
