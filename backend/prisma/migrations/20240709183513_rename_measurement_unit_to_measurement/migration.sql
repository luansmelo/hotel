/*
  Warnings:

  - You are about to drop the column `measurement` on the `inputsOnProducts` table. All the data in the column will be lost.
  - You are about to drop the `measurement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `measurement` to the `inputsOnProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `input` DROP FOREIGN KEY `input_measurementId_fkey`;

-- AlterTable
ALTER TABLE `inputsOnProducts` DROP COLUMN `measurement`,
    ADD COLUMN `measurement` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `measurement`;

-- CreateTable
CREATE TABLE `measurement` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `measurement_name_key`(`name`),
    INDEX `measurement_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `input` ADD CONSTRAINT `input_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `measurement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
