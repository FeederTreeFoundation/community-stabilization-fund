/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `question` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `checklist_rule` ADD COLUMN `last_updated` DATETIME NOT NULL DEFAULT NOW(),
    ADD COLUMN `last_updated_by` VARCHAR(60) NULL DEFAULT '',
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form` ADD COLUMN `last_updated` DATETIME NOT NULL DEFAULT NOW(),
    ADD COLUMN `last_updated_by` VARCHAR(60) NULL DEFAULT '',
    ADD COLUMN `submitted_by` VARCHAR(60) NULL DEFAULT '',
    ADD COLUMN `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form_response` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `question` ADD COLUMN `last_updated` DATETIME NOT NULL DEFAULT NOW(),
    ADD COLUMN `last_updated_by` VARCHAR(60) NULL DEFAULT '',
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();
