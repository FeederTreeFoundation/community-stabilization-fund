-- CreateTable
CREATE TABLE `form_responses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(20) NOT NULL,
    `last_name` VARCHAR(20) NOT NULL,
    `email` VARCHAR(60) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `phone_type` VARCHAR(7) NULL,
    `address_id` INTEGER NOT NULL,
    `is_black` TINYINT NULL,
    `is_local` TINYINT NULL,
    `has_flu_symptoms` TINYINT NULL,
    `household_members` INTEGER NULL,
    `feminine_health_care_id` INTEGER NULL,
    `item_requests` VARCHAR(100) NULL,
    `additional_information` VARCHAR(120) NULL,
    `is_pick_up` TINYINT NULL,
    `is_volunteering` TINYINT NULL,
    `is_subscribing` TINYINT NULL,
    `_is_interested_in_memberbership` TINYINT NULL,

    UNIQUE INDEX `address_id`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
