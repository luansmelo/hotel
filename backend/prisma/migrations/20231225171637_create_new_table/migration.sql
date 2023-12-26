-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `menu_categoryId_fkey`;

-- CreateTable
CREATE TABLE `_CategoryToMenu` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CategoryToMenu_AB_unique`(`A`, `B`),
    INDEX `_CategoryToMenu_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoryToMenu` ADD CONSTRAINT `_CategoryToMenu_A_fkey` FOREIGN KEY (`A`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryToMenu` ADD CONSTRAINT `_CategoryToMenu_B_fkey` FOREIGN KEY (`B`) REFERENCES `menu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
