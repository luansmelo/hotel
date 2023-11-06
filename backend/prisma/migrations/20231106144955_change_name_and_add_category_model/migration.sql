/*
  Warnings:

  - You are about to drop the `InputsOnProducts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `InputsOnProducts` DROP FOREIGN KEY `InputsOnProducts_inputId_fkey`;

-- DropForeignKey
ALTER TABLE `InputsOnProducts` DROP FOREIGN KEY `InputsOnProducts_productId_fkey`;

-- DropTable
DROP TABLE `InputsOnProducts`;

-- DropTable
DROP TABLE `Menu`;

-- CreateTable
CREATE TABLE `inputsOnProducts` (
    `id` VARCHAR(191) NOT NULL,
    `inputId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `weekDay` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL DEFAULT 'MONDAY',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryOnMenu` (
    `id` VARCHAR(191) NOT NULL,
    `menuId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inputsOnProducts` ADD CONSTRAINT `inputsOnProducts_inputId_fkey` FOREIGN KEY (`inputId`) REFERENCES `input`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inputsOnProducts` ADD CONSTRAINT `inputsOnProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryOnMenu` ADD CONSTRAINT `CategoryOnMenu_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CategoryOnMenu` ADD CONSTRAINT `CategoryOnMenu_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
