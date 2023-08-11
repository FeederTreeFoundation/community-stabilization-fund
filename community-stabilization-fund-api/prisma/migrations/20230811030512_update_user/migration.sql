/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `checklist_rule` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `name` on table `api_user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `organization` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `api_user` MODIFY `name` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `checklist_rule` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `form_response` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `organization` MODIFY `name` VARCHAR(20) NOT NULL;
