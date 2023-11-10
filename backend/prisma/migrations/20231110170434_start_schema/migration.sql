-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `account_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `product_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inputsOnProducts` (
    `id` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `inputId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `unitPrice` DOUBLE NOT NULL,
    `measurementUnit` VARCHAR(191) NOT NULL,
    `group` VARCHAR(191) NOT NULL,
    `grammage` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `input` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `unitPrice` DOUBLE NOT NULL,
    `group` VARCHAR(191) NOT NULL,
    `measurementUnit` VARCHAR(191) NOT NULL,
    `grammage` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoryProductSchedule` (
    `id` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `weekDay` ENUM('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO') NOT NULL DEFAULT 'SEGUNDA',

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
ALTER TABLE `menu` ADD CONSTRAINT `menu_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoryProductSchedule` ADD CONSTRAINT `categoryProductSchedule_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoryProductSchedule` ADD CONSTRAINT `categoryProductSchedule_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
