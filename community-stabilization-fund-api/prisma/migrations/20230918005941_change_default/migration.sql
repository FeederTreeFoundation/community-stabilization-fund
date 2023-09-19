/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `form` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `feminine_health_care_id` on the `form_response` table. All the data in the column will be lost.
  - You are about to drop the column `is_black` on the `form_response` table. All the data in the column will be lost.
  - You are about to drop the column `is_pick_up` on the `form_response` table. All the data in the column will be lost.
  - You are about to drop the column `live_in_pittsburgh_atlanta` on the `form_response` table. All the data in the column will be lost.
  - You are about to drop the column `live_in_southside_atlanta` on the `form_response` table. All the data in the column will be lost.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `organization` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `question` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `question` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `feminine_health_care` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `form_response` DROP FOREIGN KEY `form_response_ibfk_1`;

-- AlterTable
ALTER TABLE `checklist_rule` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `last_updated` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form` MODIFY `last_updated` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form_response` DROP COLUMN `feminine_health_care_id`,
    DROP COLUMN `is_black`,
    DROP COLUMN `is_pick_up`,
    DROP COLUMN `live_in_pittsburgh_atlanta`,
    DROP COLUMN `live_in_southside_atlanta`,
    ADD COLUMN `ethnicity` VARCHAR(60) NULL DEFAULT '',
    ADD COLUMN `menstruating_health_care_id` INTEGER NULL,
    ADD COLUMN `race` VARCHAR(60) NULL DEFAULT '',
    ADD COLUMN `transport_preference` VARCHAR(100) NULL DEFAULT '',
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `organization` MODIFY `submitted_on` DATETIME NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `question` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `last_updated` DATETIME NOT NULL DEFAULT NOW();

-- DropTable
DROP TABLE `feminine_health_care`;

-- CreateTable
CREATE TABLE `menstruating_health_care` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menstruating_members` INTEGER NOT NULL,
    `hygiene_items` VARCHAR(250) NULL,
    `needs_plan_b` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `menstruating_health_care_id` ON `form_response`(`menstruating_health_care_id`);

-- AddForeignKey
ALTER TABLE `form_response` ADD CONSTRAINT `form_response_ibfk_1` FOREIGN KEY (`menstruating_health_care_id`) REFERENCES `menstruating_health_care`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
