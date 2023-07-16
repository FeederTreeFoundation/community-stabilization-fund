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
    `needs_plan_b` BOOLEAN NULL,

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
    `address_city` VARCHAR(36) NULL,
    `address_country` VARCHAR(60) NULL,
    `address_line1` VARCHAR(250) NULL,
    `address_line2` VARCHAR(250) NULL,
    `address_state` VARCHAR(5) NULL,
    `address_zip` VARCHAR(10) NULL,
    `is_black` TINYINT NULL,
    `is_local` TINYINT NULL,
    `packages_to_receive` VARCHAR(250) NULL,
    `has_flu_symptoms` TINYINT NULL,
    `household_members` INTEGER NULL,
    `feminine_health_care_id` INTEGER NULL,
    `item_requests` VARCHAR(100) NULL,
    `additional_information` VARCHAR(250) NULL,
    `is_pick_up` TINYINT NULL,
    `is_volunteering` TINYINT NULL,
    `is_subscribing` TINYINT NULL,
    `is_interested_in_membership` TINYINT NULL,

    UNIQUE INDEX `address_id`(`address_id`),
    INDEX `feminine_health_care_id`(`feminine_health_care_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `api_key` ADD CONSTRAINT `api_key_ibfk_1` FOREIGN KEY (`api_user_id`) REFERENCES `api_user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `form_response` ADD CONSTRAINT `form_response_ibfk_1` FOREIGN KEY (`feminine_health_care_id`) REFERENCES `feminine_health_care`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
