/*
  Warnings:

  - You are about to alter the column `weekDay` on the `categoryProductSchedule` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `categoryProductSchedule` MODIFY `weekDay` ENUM('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO') NOT NULL DEFAULT 'SEGUNDA';
