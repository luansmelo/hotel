/*
  Warnings:

  - You are about to drop the column `inputId` on the `group` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `group` DROP FOREIGN KEY `group_inputId_fkey`;

-- AlterTable
ALTER TABLE `group` DROP COLUMN `inputId`;

-- CreateTable
CREATE TABLE `groupsOnInputs` (
    `id` VARCHAR(191) NOT NULL,
    `inputId` VARCHAR(191) NOT NULL,
    `groupId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `groupsOnInputs` ADD CONSTRAINT `groupsOnInputs_inputId_fkey` FOREIGN KEY (`inputId`) REFERENCES `input`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupsOnInputs` ADD CONSTRAINT `groupsOnInputs_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
