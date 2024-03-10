/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `input` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `input_name_key` ON `input`(`name`);
