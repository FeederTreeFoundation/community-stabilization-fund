/*
  Warnings:

  - You are about to alter the column `city` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(36)` to `VarChar(30)`.
  - You are about to alter the column `line1` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(30)`.
  - You are about to alter the column `line2` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(250)` to `VarChar(30)`.
  - You are about to alter the column `country` on the `address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(30)`.
  - You are about to alter the column `submitted_on` on the `form_response` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `address` MODIFY `city` VARCHAR(30) NOT NULL,
    MODIFY `line1` VARCHAR(30) NOT NULL,
    MODIFY `line2` VARCHAR(30) NULL,
    MODIFY `country` VARCHAR(30) NOT NULL;

-- AlterTable
ALTER TABLE `form_response` MODIFY `submitted_on` DATETIME NOT NULL DEFAULT NOW();
