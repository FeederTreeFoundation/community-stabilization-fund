/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `custom_fields` on the `form_response` table. All the data in the column will be lost.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `question_ibfk_1`;

-- AlterTable
ALTER TABLE `answer` ADD COLUMN `form_response_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `checklist_rule` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form_response` DROP COLUMN `custom_fields`,
    ADD COLUMN `form_id` INTEGER NULL,
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `question` ADD COLUMN `form_id` INTEGER NULL,
    ADD COLUMN `submitted_by` VARCHAR(60) NULL DEFAULT '',
    ADD COLUMN `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- CreateTable
CREATE TABLE `form` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `organization_id` INTEGER NOT NULL,

    INDEX `organization_id`(`organization_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `form_response_id` ON `answer`(`form_response_id`);

-- CreateIndex
CREATE INDEX `form_id` ON `form_response`(`form_id`);

-- CreateIndex
CREATE INDEX `form_id` ON `question`(`form_id`);

-- AddForeignKey
ALTER TABLE `form_response` ADD CONSTRAINT `form_response_ibfk_3` FOREIGN KEY (`form_id`) REFERENCES `form`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `answer` ADD CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`form_response_id`) REFERENCES `form_response`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `question` ADD CONSTRAINT `question_ibfk_2` FOREIGN KEY (`form_id`) REFERENCES `form`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `form` ADD CONSTRAINT `form_ibfk_1` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
