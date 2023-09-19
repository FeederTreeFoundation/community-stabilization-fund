/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `form` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `question` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `question` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `checklist_rule` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `last_updated` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form` MODIFY `last_updated` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form_response` ADD COLUMN `archived_by` VARCHAR(60) NULL DEFAULT '',
    MODIFY `email` VARCHAR(60) NULL DEFAULT '',
    MODIFY `phone_number` VARCHAR(15) NULL DEFAULT '',
    MODIFY `phone_type` VARCHAR(7) NULL DEFAULT '',
    MODIFY `packages_to_receive` VARCHAR(250) NULL DEFAULT '',
    MODIFY `item_requests` VARCHAR(100) NULL DEFAULT '',
    MODIFY `additional_information` VARCHAR(250) NULL DEFAULT '',
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `organization` ADD COLUMN `disable_default_questions_json` VARCHAR(50) NULL DEFAULT '',
    ADD COLUMN `submitted_by` VARCHAR(60) NULL DEFAULT '',
    ADD COLUMN `submitted_on` DATETIME NULL DEFAULT NOW(),
    MODIFY `bag_label_type` VARCHAR(40) NULL DEFAULT '',
    MODIFY `short_name` VARCHAR(10) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `question` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `last_updated` DATETIME NOT NULL DEFAULT NOW();
