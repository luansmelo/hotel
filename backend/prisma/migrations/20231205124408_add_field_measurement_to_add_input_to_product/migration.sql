/*
  Warnings:

  - Added the required column `measurementUnit` to the `inputsOnProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inputsOnProducts` ADD COLUMN `measurementUnit` VARCHAR(191) NOT NULL;
