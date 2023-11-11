/*
  Warnings:

  - Added the required column `created_at` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `categoryProductSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `categoryProductSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `input` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `inputsOnProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `inputsOnProducts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_at` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `created_at` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `categoryProductSchedule` ADD COLUMN `created_at` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `input` ADD COLUMN `created_at` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `inputsOnProducts` ADD COLUMN `created_at` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `menu` ADD COLUMN `created_at` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `created_at` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` VARCHAR(191) NOT NULL;
