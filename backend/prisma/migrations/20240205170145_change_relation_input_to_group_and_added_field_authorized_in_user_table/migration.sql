/*
  Warnings:

  - You are about to drop the column `groupId` on the `input` table. All the data in the column will be lost.
  - Added the required column `inputId` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `input` DROP FOREIGN KEY `input_groupId_fkey`;

-- AlterTable
ALTER TABLE `group` ADD COLUMN `inputId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `input` DROP COLUMN `groupId`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isAuthorized` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `group` ADD CONSTRAINT `group_inputId_fkey` FOREIGN KEY (`inputId`) REFERENCES `input`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
