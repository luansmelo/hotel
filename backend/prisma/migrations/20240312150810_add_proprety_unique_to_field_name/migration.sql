/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `menu` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `category_name_key` ON `category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `menu_name_key` ON `menu`(`name`);
