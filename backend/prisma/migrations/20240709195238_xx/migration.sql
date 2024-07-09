/*
  Warnings:

  - You are about to drop the `input` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `groupsOnInputs` DROP FOREIGN KEY `groupsOnInputs_ingredientId_fkey`;

-- DropForeignKey
ALTER TABLE `input` DROP FOREIGN KEY `input_measurementId_fkey`;

-- DropForeignKey
ALTER TABLE `inputsOnProducts` DROP FOREIGN KEY `inputsOnProducts_ingredientId_fkey`;

-- DropTable
DROP TABLE `input`;

-- CreateTable
CREATE TABLE `ingredient` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `unitPrice` DOUBLE NOT NULL,
    `status` ENUM('COMPLETE', 'INCOMPLETE') NULL DEFAULT 'INCOMPLETE',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `measurementId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ingredient_name_key`(`name`),
    UNIQUE INDEX `ingredient_code_key`(`code`),
    INDEX `ingredient_code_name_unitPrice_idx`(`code`, `name`, `unitPrice`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `inputsOnProducts` ADD CONSTRAINT `inputsOnProducts_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ingredient` ADD CONSTRAINT `ingredient_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `measurement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupsOnInputs` ADD CONSTRAINT `groupsOnInputs_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `ingredient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
