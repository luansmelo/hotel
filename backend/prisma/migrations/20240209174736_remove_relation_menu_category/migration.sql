/*
  Warnings:

  - You are about to drop the `group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `groupsOnInputs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menuCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `groupsOnInputs` DROP FOREIGN KEY `groupsOnInputs_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `groupsOnInputs` DROP FOREIGN KEY `groupsOnInputs_inputId_fkey`;

-- DropForeignKey
ALTER TABLE `menuCategory` DROP FOREIGN KEY `menuCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `menuCategory` DROP FOREIGN KEY `menuCategory_menuId_fkey`;

-- AlterTable
ALTER TABLE `menu` ADD COLUMN `categoryId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `group`;

-- DropTable
DROP TABLE `groupsOnInputs`;

-- DropTable
DROP TABLE `menuCategory`;

-- AddForeignKey
ALTER TABLE `menu` ADD CONSTRAINT `menu_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
