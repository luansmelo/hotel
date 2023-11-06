/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `weekDay` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY') NOT NULL DEFAULT 'MONDAY';

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `account_email_key` ON `account`(`email`);
