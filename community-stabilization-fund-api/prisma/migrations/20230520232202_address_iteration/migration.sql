/*
  Warnings:

  - You are about to drop the column `address_city` on the `form_response` table. All the data in the column will be lost.
  - You are about to drop the column `address_country` on the `form_response` table. All the data in the column will be lost.
  - You are about to drop the column `address_line1` on the `form_response` table. All the data in the column will be lost.
  - You are about to drop the column `address_line2` on the `form_response` table. All the data in the column will be lost.
  - You are about to drop the column `address_state` on the `form_response` table. All the data in the column will be lost.
  - You are about to drop the column `address_zip` on the `form_response` table. All the data in the column will be lost.
  - Made the column `needs_plan_b` on table `feminine_health_care` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `is_joining` to the `form_response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `live_in_pittsburgh_atlanta` to the `form_response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `live_in_southside_atlanta` to the `form_response` table without a default value. This is not possible if the table is not empty.
  - Made the column `is_black` on table `form_response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_local` on table `form_response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `packages_to_receive` on table `form_response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_flu_symptoms` on table `form_response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `household_members` on table `form_response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_pick_up` on table `form_response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_volunteering` on table `form_response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_subscribing` on table `form_response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `is_interested_in_membership` on table `form_response` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `address_id` ON `form_response`;


-- AlterTable
ALTER TABLE `feminine_health_care` MODIFY `needs_plan_b` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `form_response` DROP COLUMN `address_city`,
    DROP COLUMN `address_country`,
    DROP COLUMN `address_line1`,
    DROP COLUMN `address_line2`,
    DROP COLUMN `address_state`,
    DROP COLUMN `address_zip`,
    ADD COLUMN `elderly_members` INTEGER NULL,
    ADD COLUMN `is_joining` BOOLEAN NOT NULL,
    ADD COLUMN `live_in_pittsburgh_atlanta` BOOLEAN NOT NULL,
    ADD COLUMN `live_in_southside_atlanta` BOOLEAN NOT NULL,
    ADD COLUMN `submitted_on` DATETIME NOT NULL DEFAULT NOW(),
    ADD COLUMN `youth_members` INTEGER NULL,
    MODIFY `is_black` BOOLEAN NOT NULL,
    MODIFY `is_local` BOOLEAN NOT NULL,
    MODIFY `packages_to_receive` VARCHAR(250) NOT NULL,
    MODIFY `has_flu_symptoms` BOOLEAN NOT NULL,
    MODIFY `household_members` INTEGER NOT NULL,
    MODIFY `is_pick_up` BOOLEAN NOT NULL,
    MODIFY `is_volunteering` BOOLEAN NOT NULL,
    MODIFY `is_subscribing` BOOLEAN NOT NULL,
    MODIFY `is_interested_in_membership` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city` VARCHAR(36) NOT NULL,
    `state` VARCHAR(5) NOT NULL,
    `zipcode` INTEGER NOT NULL,
    `line1` VARCHAR(250) NOT NULL,
    `line2` VARCHAR(250) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `address_id` ON `form_response`(`address_id`);

-- AddForeignKey
ALTER TABLE `form_response` ADD CONSTRAINT `form_response_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
