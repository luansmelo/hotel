-- AlterTable
ALTER TABLE `input` ADD COLUMN `status` ENUM('COMPLETE', 'INCOMPLETE') NULL DEFAULT 'INCOMPLETE';

-- AlterTable
ALTER TABLE `product` ADD COLUMN `status` ENUM('COMPLETE', 'INCOMPLETE') NULL DEFAULT 'INCOMPLETE';
