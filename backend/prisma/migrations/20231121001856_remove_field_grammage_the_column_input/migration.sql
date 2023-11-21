/*
  Warnings:

  - You are about to drop the column `grammage` on the `input` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `inputsOnProducts` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `inputsOnProducts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `input` DROP COLUMN `grammage`;

-- AlterTable
ALTER TABLE `inputsOnProducts` DROP COLUMN `code`,
    DROP COLUMN `group`;
