/*
  Warnings:

  - You are about to drop the `CategoryOnMenu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `CategoryOnMenu` DROP FOREIGN KEY `CategoryOnMenu_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `CategoryOnMenu` DROP FOREIGN KEY `CategoryOnMenu_menuId_fkey`;

-- DropTable
DROP TABLE `CategoryOnMenu`;

-- CreateTable
CREATE TABLE `categoryOnMenu` (
    `id` VARCHAR(191) NOT NULL,
    `menuId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categoryOnMenu` ADD CONSTRAINT `categoryOnMenu_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoryOnMenu` ADD CONSTRAINT `categoryOnMenu_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
