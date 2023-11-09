/*
  Warnings:

  - Added the required column `productId` to the `categoryOnMenu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoryOnMenu` ADD COLUMN `productId` VARCHAR(191) NOT NULL,
    ADD COLUMN `weekDay` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL DEFAULT 'MONDAY';

-- AddForeignKey
ALTER TABLE `categoryOnMenu` ADD CONSTRAINT `categoryOnMenu_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
