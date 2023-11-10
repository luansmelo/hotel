/*
  Warnings:

  - You are about to drop the `categoryOnMenu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `categoryOnMenu` DROP FOREIGN KEY `categoryOnMenu_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `categoryOnMenu` DROP FOREIGN KEY `categoryOnMenu_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `categoryOnMenu` DROP FOREIGN KEY `categoryOnMenu_productId_fkey`;

-- DropTable
DROP TABLE `categoryOnMenu`;

-- CreateTable
CREATE TABLE `categoryProductSchedule` (
    `id` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `weekDay` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL DEFAULT 'MONDAY',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categoryProductSchedule` ADD CONSTRAINT `categoryProductSchedule_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoryProductSchedule` ADD CONSTRAINT `categoryProductSchedule_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
