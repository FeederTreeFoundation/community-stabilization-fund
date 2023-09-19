/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `is_joining` on the `form_response` table. All the data in the column will be lost.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `checklist_rule` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form_response` DROP COLUMN `is_joining`,
    MODIFY `is_black` BOOLEAN NULL DEFAULT false,
    MODIFY `is_local` BOOLEAN NULL DEFAULT false,
    MODIFY `packages_to_receive` VARCHAR(250) NULL DEFAULT '[]',
    MODIFY `has_flu_symptoms` BOOLEAN NULL DEFAULT false,
    MODIFY `household_members` INTEGER NULL DEFAULT 1,
    MODIFY `is_pick_up` BOOLEAN NULL DEFAULT false,
    MODIFY `is_volunteering` BOOLEAN NULL DEFAULT false,
    MODIFY `is_subscribing` BOOLEAN NULL DEFAULT false,
    MODIFY `is_interested_in_membership` BOOLEAN NULL DEFAULT false,
    MODIFY `elderly_members` INTEGER NULL DEFAULT 0,
    MODIFY `live_in_pittsburgh_atlanta` BOOLEAN NULL DEFAULT false,
    MODIFY `live_in_southside_atlanta` BOOLEAN NULL DEFAULT false,
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `youth_members` INTEGER NULL DEFAULT 0,
    MODIFY `archived` BOOLEAN NULL DEFAULT false;

-- CreateTable
CREATE TABLE `answer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `text` VARCHAR(500) NOT NULL,

    INDEX `question_id`(`question_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(250) NOT NULL,
    `hidden` BOOLEAN NOT NULL DEFAULT false,
    `type` VARCHAR(20) NOT NULL,
    `organization_id` INTEGER NULL,
    `form_response_id` INTEGER NULL,

    INDEX `organization_id`(`organization_id`),
    INDEX `form_response_id`(`form_response_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `question`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`form_response_id`) REFERENCES `form_response`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
