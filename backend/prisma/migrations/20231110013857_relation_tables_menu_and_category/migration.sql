/*
  Warnings:

  - You are about to drop the column `weekDay` on the `menu` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `menu` DROP COLUMN `weekDay`,
    ADD COLUMN `categoryId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
