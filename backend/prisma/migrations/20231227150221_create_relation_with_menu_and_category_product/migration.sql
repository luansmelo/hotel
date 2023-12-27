/*
  Warnings:

  - Added the required column `menuId` to the `categoryProductSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoryProductSchedule` ADD COLUMN `menuId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `categoryProductSchedule` ADD CONSTRAINT `categoryProductSchedule_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
