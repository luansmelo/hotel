/*
  Warnings:

  - Added the required column `group` to the `input` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `input` ADD COLUMN `group` VARCHAR(191) NOT NULL;
