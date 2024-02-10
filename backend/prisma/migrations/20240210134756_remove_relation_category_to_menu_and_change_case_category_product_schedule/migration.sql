/*
  Warnings:

  - You are about to drop the column `categoryId` on the `menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `menu_categoryId_fkey`;

-- AlterTable
ALTER TABLE `menu` DROP COLUMN `categoryId`;
