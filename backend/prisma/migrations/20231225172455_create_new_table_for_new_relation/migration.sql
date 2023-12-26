/*
  Warnings:

  - You are about to drop the column `categoryId` on the `menu` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToMenu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CategoryToMenu` DROP FOREIGN KEY `_CategoryToMenu_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CategoryToMenu` DROP FOREIGN KEY `_CategoryToMenu_B_fkey`;

-- DropIndex
DROP INDEX `menu_categoryId_fkey` ON `menu`;

-- AlterTable
ALTER TABLE `menu` DROP COLUMN `categoryId`;

-- DropTable
DROP TABLE `_CategoryToMenu`;

-- CreateTable
CREATE TABLE `menuCategory` (
    `id` VARCHAR(191) NOT NULL,
    `menuId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `created_at` VARCHAR(191) NOT NULL,
    `updated_at` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `menuCategory` ADD CONSTRAINT `menuCategory_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menuCategory` ADD CONSTRAINT `menuCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
