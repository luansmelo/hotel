/*
  Warnings:

  - You are about to drop the column `group` on the `input` table. All the data in the column will be lost.
  - You are about to drop the column `measurement` on the `input` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measurementId` to the `input` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `input` DROP COLUMN `group`,
    DROP COLUMN `measurement`,
    ADD COLUMN `groupId` VARCHAR(191) NOT NULL,
    ADD COLUMN `measurementId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `input` ADD CONSTRAINT `input_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `input` ADD CONSTRAINT `input_measurementId_fkey` FOREIGN KEY (`measurementId`) REFERENCES `measurement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
