-- DropForeignKey
ALTER TABLE `groupsOnInputs` DROP FOREIGN KEY `groupsOnInputs_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `groupsOnInputs` DROP FOREIGN KEY `groupsOnInputs_inputId_fkey`;

-- AddForeignKey
ALTER TABLE `groupsOnInputs` ADD CONSTRAINT `groupsOnInputs_inputId_fkey` FOREIGN KEY (`inputId`) REFERENCES `input`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groupsOnInputs` ADD CONSTRAINT `groupsOnInputs_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `group`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
