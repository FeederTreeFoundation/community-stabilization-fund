/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `api_user` ADD COLUMN `organization_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `checklist_rule` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form_response` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- CreateTable
CREATE TABLE `organization` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,
    `bag_label_type` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `organization_id` ON `api_user`(`organization_id`);

-- AddForeignKey
ALTER TABLE `api_user` ADD CONSTRAINT `api_user_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
