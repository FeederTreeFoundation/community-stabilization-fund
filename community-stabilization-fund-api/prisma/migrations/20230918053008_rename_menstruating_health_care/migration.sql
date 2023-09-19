/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `form` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `menstruating_health_care_id` on the `form_response` table. All the data in the column will be lost.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `organization` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `question` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `last_updated` on the `question` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `menstruating_health_care` table. If the table is not empty, all the data it contains will be lost.

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
ALTER TABLE `form_response` DROP COLUMN `menstruating_health_care_id`,
    ADD COLUMN `menstrual_health_care_id` INTEGER NULL,
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `organization` MODIFY `submitted_on` DATETIME NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `question` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `last_updated` DATETIME NOT NULL DEFAULT NOW();

-- DropTable
DROP TABLE `menstruating_health_care`;

-- CreateTable
CREATE TABLE `menstrual_health_care` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `menstruating_members` INTEGER NOT NULL DEFAULT 0,
    `hygiene_items` VARCHAR(250) NULL,
    `needs_plan_b` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `menstrual_health_care_id` ON `form_response`(`menstrual_health_care_id`);

-- AddForeignKey
ALTER TABLE `form_response` ADD CONSTRAINT `form_response_ibfk_1` FOREIGN KEY (`menstrual_health_care_id`) REFERENCES `menstrual_health_care`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
