/*
  Warnings:

  - You are about to alter the column `created_at` on the `category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `updated_at` on the `category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `created_at` on the `categoryProductSchedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `updated_at` on the `categoryProductSchedule` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `created_at` on the `group` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `updated_at` on the `group` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `created_at` on the `input` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `updated_at` on the `input` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `created_at` on the `inputsOnProducts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `updated_at` on the `inputsOnProducts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `created_at` on the `measurementUnit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `updated_at` on the `measurementUnit` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `created_at` on the `menu` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `updated_at` on the `menu` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `created_at` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `updated_at` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `created_at` on the `product_media` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `updated_at` on the `product_media` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `created_at` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - You are about to alter the column `updated_at` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp(6)`.
  - Added the required column `preparationTime` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resource` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `categoryProductSchedule` DROP FOREIGN KEY `categoryProductSchedule_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `categoryProductSchedule` DROP FOREIGN KEY `categoryProductSchedule_menuId_fkey`;

-- DropForeignKey
ALTER TABLE `categoryProductSchedule` DROP FOREIGN KEY `categoryProductSchedule_productId_fkey`;

-- DropForeignKey
ALTER TABLE `input` DROP FOREIGN KEY `input_measurementUnitId_fkey`;

-- DropForeignKey
ALTER TABLE `inputsOnProducts` DROP FOREIGN KEY `inputsOnProducts_inputId_fkey`;

-- DropForeignKey
ALTER TABLE `inputsOnProducts` DROP FOREIGN KEY `inputsOnProducts_productId_fkey`;

-- DropForeignKey
ALTER TABLE `product_media` DROP FOREIGN KEY `product_media_productId_fkey`;

-- AlterTable
ALTER TABLE `category` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `categoryProductSchedule` MODIFY `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updated_at` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `group` MODIFY `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updated_at` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `input` MODIFY `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `inputsOnProducts` MODIFY `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updated_at` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `measurementUnit` MODIFY `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updated_at` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `menu` MODIFY `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updated_at` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `preparationTime` DOUBLE NOT NULL,
    ADD COLUMN `resource` VARCHAR(400) NOT NULL,
    MODIFY `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updated_at` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `product_media` MODIFY `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updated_at` TIMESTAMP(6) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updated_at` TIMESTAMP(6) NOT NULL,
    MODIFY `role` ENUM('USER', 'LEADER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- AddForeignKey
ALTER TABLE `product_media` ADD CONSTRAINT `product_media_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inputsOnProducts` ADD CONSTRAINT `inputsOnProducts_inputId_fkey` FOREIGN KEY (`inputId`) REFERENCES `input`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inputsOnProducts` ADD CONSTRAINT `inputsOnProducts_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `input` ADD CONSTRAINT `input_measurementUnitId_fkey` FOREIGN KEY (`measurementUnitId`) REFERENCES `measurementUnit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoryProductSchedule` ADD CONSTRAINT `categoryProductSchedule_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoryProductSchedule` ADD CONSTRAINT `categoryProductSchedule_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoryProductSchedule` ADD CONSTRAINT `categoryProductSchedule_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
