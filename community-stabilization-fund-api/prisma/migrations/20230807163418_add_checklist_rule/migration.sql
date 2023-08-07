/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `form_response` ADD COLUMN `archived` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `archived_on` DATETIME(3) NULL,
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- CreateTable
CREATE TABLE `package_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `package_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `checklist_rule` (
    `quantity` VARCHAR(191) NOT NULL,
    `household_members` VARCHAR(191) NOT NULL,
    `bag_label_type` VARCHAR(191) NOT NULL,
    `delayed_until` DATETIME(3) NULL,
    `days_delayed_by` INTEGER NULL,
    `weeks_delayed_by` INTEGER NULL,
    `package_item_id` INTEGER NOT NULL,
    `package_group_id` INTEGER NOT NULL,
    `submitted_on` DATETIME NOT NULL DEFAULT NOW(),

    PRIMARY KEY (`package_item_id`, `package_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `checklist_rule` ADD CONSTRAINT `checklist_rule_package_item_id_fkey` FOREIGN KEY (`package_item_id`) REFERENCES `package_item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `checklist_rule` ADD CONSTRAINT `checklist_rule_package_group_id_fkey` FOREIGN KEY (`package_group_id`) REFERENCES `package_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
