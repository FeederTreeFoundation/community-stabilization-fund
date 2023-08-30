/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `form_response_id` on the `question` table. All the data in the column will be lost.
  - Made the column `organization_id` on table `question` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_ibfk_1`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_ibfk_2`;

-- AlterTable
ALTER TABLE `checklist_rule` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form_response` ADD COLUMN `custom_fields` VARCHAR(250) NULL DEFAULT '[]',
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `question` DROP COLUMN `form_response_id`,
    MODIFY `organization_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
