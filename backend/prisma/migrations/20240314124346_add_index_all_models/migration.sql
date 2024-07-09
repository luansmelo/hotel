-- CreateIndex
CREATE INDEX `category_name_idx` ON `category`(`name`);

-- CreateIndex
CREATE INDEX `categoryProductSchedule_menuId_categoryId_productId_weekDay_idx` ON `categoryProductSchedule`(`menuId`, `categoryId`, `productId`, `weekDay`);

-- CreateIndex
CREATE INDEX `groupsOnInputs_inputId_groupId_idx` ON `groupsOnInputs`(`inputId`, `groupId`);

-- CreateIndex
CREATE INDEX `input_code_name_unitPrice_idx` ON `input`(`code`, `name`, `unitPrice`);

-- CreateIndex
CREATE INDEX `measurement_name_idx` ON `measurement`(`name`);

-- CreateIndex
CREATE INDEX `menu_name_idx` ON `menu`(`name`);

-- CreateIndex
CREATE INDEX `product_name_idx` ON `product`(`name`);

-- CreateIndex
CREATE INDEX `user_email_idx` ON `user`(`email`);

-- RenameIndex
ALTER TABLE `group` RENAME INDEX `group_name` TO `group_name_idx`;
