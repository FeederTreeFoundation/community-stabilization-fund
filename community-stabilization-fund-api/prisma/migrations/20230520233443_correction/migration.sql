/*
  Warnings:

  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `country` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` ADD COLUMN `country` VARCHAR(50) NOT NULL,
    MODIFY `state` VARCHAR(30) NOT NULL,
    MODIFY `zipcode` VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE `form_response` MODIFY `is_joining` BOOLEAN NULL,
    MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();
