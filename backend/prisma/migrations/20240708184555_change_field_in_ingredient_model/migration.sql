/*
  Warnings:

  - You are about to drop the column `measurementId` on the `input` table. All the data in the column will be lost.
  - Added the required column `measurementId` to the `input` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `input` DROP FOREIGN KEY `input_measurementId_fkey`;

-- AlterTable
ALTER TABLE `input` DROP COLUMN `measurementId`,
    ADD COLUMN `measurementId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `input` ADD CONSTRAINT `input_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `measurement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
