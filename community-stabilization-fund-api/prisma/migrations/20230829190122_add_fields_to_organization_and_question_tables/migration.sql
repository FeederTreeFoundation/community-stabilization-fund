/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `checklist_rule` ADD COLUMN `organization_id` INTEGER NULL,
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form_response` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `question` ADD COLUMN `required` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX `organization_id` ON `checklist_rule`(`organization_id`);

-- AddForeignKey
ALTER TABLE `checklist_rule` ADD CONSTRAINT `checklist_rule_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `organization`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
