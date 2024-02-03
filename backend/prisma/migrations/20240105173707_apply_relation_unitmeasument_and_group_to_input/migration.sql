/*
  Warnings:

  - You are about to drop the column `group` on the `input` table. All the data in the column will be lost.
  - You are about to drop the column `measurementUnit` on the `input` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measurementUnitId` to the `input` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `input` DROP COLUMN `group`,
    DROP COLUMN `measurementUnit`,
    ADD COLUMN `groupId` VARCHAR(191) NOT NULL,
    ADD COLUMN `measurementUnitId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `input` ADD CONSTRAINT `input_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `input` ADD CONSTRAINT `input_measurementUnitId_fkey` FOREIGN KEY (`measurementUnitId`) REFERENCES `measurementUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;