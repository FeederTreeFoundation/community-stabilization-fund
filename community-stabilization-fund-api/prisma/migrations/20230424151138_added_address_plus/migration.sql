/*
  Warnings:

  - You are about to drop the `form_responses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `form_responses`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `api_key` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,
    `api_user_id` INTEGER NULL,

    INDEX `api_user_id`(`api_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `api_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feminine_health_care` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `feminine_members` INTEGER NOT NULL,
    `hygiene_items` VARCHAR(250) NULL,
    `needs_plan_b` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `form_response` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(20) NOT NULL,
    `last_name` VARCHAR(20) NOT NULL,
    `email` VARCHAR(60) NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `phone_type` VARCHAR(7) NULL,
    `address_id` INTEGER NULL,
    `is_black` BOOLEAN NOT NULL,
    `is_local` BOOLEAN NOT NULL,
    `packages_to_receive` VARCHAR(250) NOT NULL,
    `has_flu_symptoms` BOOLEAN NOT NULL,
    `household_members` INTEGER NOT NULL,
    `feminine_health_care_id` INTEGER NULL,
    `item_requests` VARCHAR(100) NULL,
    `additional_information` VARCHAR(250) NULL,
    `is_pick_up` BOOLEAN NOT NULL,
    `is_volunteering` BOOLEAN NOT NULL,
    `is_subscribing` BOOLEAN NOT NULL,
    `is_joining` BOOLEAN NOT NULL,
    `is_interested_in_membership` BOOLEAN NOT NULL,
    `live_in_pittsburgh_atlanta` BOOLEAN NOT NULL,
    `live_in_southside_atlanta` BOOLEAN NOT NULL,
    `submitted_on` VARCHAR(250) NULL,

    INDEX `feminine_health_care_id`(`feminine_health_care_id`),
    INDEX `address_id`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `api_key` ADD CONSTRAINT `api_key_ibfk_1` FOREIGN KEY (`api_user_id`) REFERENCES `api_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `form_response` ADD CONSTRAINT `form_response_ibfk_1` FOREIGN KEY (`feminine_health_care_id`) REFERENCES `feminine_health_care`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `form_response` ADD CONSTRAINT `form_response_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
