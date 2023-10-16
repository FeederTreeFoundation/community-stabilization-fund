/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `form` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `organization` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `question` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `question` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `package_group_items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `package_group_items` DROP FOREIGN KEY `package_group_items_package_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `package_group_items` DROP FOREIGN KEY `package_group_items_package_item_id_fkey`;

-- AlterTable
ALTER TABLE `checklist_rule` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `last_updated` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form` MODIFY `last_updated` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form_response` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `organization` MODIFY `submitted_on` DATETIME NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `question` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `last_updated` DATETIME NOT NULL DEFAULT NOW();

-- DropTable
DROP TABLE `package_group_items`;

-- CreateTable
CREATE TABLE `package_group_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `package_item_id` INTEGER NOT NULL,
    `package_group_id` INTEGER NOT NULL,

    INDEX `package_group_id`(`package_group_id`),
    INDEX `package_item_id`(`package_item_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `package_group_item` ADD CONSTRAINT `package_group_item_package_item_id_fkey` FOREIGN KEY (`package_item_id`) REFERENCES `package_item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `package_group_item` ADD CONSTRAINT `package_group_item_package_group_id_fkey` FOREIGN KEY (`package_group_id`) REFERENCES `package_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
