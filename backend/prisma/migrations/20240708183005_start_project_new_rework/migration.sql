/*
  Warnings:

  - You are about to drop the column `inputId` on the `groupsOnInputs` table. All the data in the column will be lost.
  - You are about to drop the column `inputId` on the `inputsOnProducts` table. All the data in the column will be lost.
  - Added the required column `ingredientId` to the `groupsOnInputs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredientId` to the `inputsOnProducts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `groupsOnInputs` DROP FOREIGN KEY `groupsOnInputs_inputId_fkey`;

-- DropForeignKey
ALTER TABLE `inputsOnProducts` DROP FOREIGN KEY `inputsOnProducts_inputId_fkey`;

-- DropIndex
DROP INDEX `groupsOnInputs_inputId_groupId_idx` ON `groupsOnInputs`;

-- AlterTable
ALTER TABLE `groupsOnInputs` DROP COLUMN `inputId`,
    ADD COLUMN `ingredientId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `inputsOnProducts` DROP COLUMN `inputId`,
    ADD COLUMN `ingredientId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `groupsOnInputs_ingredientId_groupId_idx` ON `groupsOnInputs`(`ingredientId`, `groupId`);

-- AddForeignKey
ALTER TABLE `inputsOnProducts` ADD CONSTRAINT `inputsOnProducts_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `input`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupsOnInputs` ADD CONSTRAINT `groupsOnInputs_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `input`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
