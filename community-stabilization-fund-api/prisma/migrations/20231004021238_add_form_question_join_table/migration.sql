/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `form` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `organization` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `form_id` on the `question` table. All the data in the column will be lost.
  - You are about to alter the column `submitted_on` on the `question` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `question` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_ibfk_2`;

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
ALTER TABLE `question` DROP COLUMN `form_id`,
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `last_updated` DATETIME NOT NULL DEFAULT NOW();

-- CreateTable
CREATE TABLE `form_question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `form_id` INTEGER NOT NULL,
    `question_id` INTEGER NOT NULL,

    INDEX `form_id`(`form_id`),
    INDEX `question_id`(`question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `form_question` ADD CONSTRAINT `form_question_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `form`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `form_question` ADD CONSTRAINT `form_question_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `question`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
