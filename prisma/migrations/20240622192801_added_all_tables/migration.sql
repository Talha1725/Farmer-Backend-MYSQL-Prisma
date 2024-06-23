/*
  Warnings:

  - Added the required column `country_id` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district_id` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `field_address` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tehsil_id` to the `Fields` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Fields` ADD COLUMN `country_id` INTEGER NOT NULL,
    ADD COLUMN `district_id` INTEGER NOT NULL,
    ADD COLUMN `field_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `state_id` INTEGER NOT NULL,
    ADD COLUMN `tehsil_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Tehsils` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `district_id` INTEGER NOT NULL,
    `state_id` INTEGER NOT NULL,
    `country_id` INTEGER NOT NULL,
    `salinity_exposure` INTEGER NULL,
    `salinity_exposure_max` INTEGER NULL,
    `arsenic_exposure` INTEGER NULL,
    `arsenic_exposure_max` INTEGER NULL,
    `water_level` INTEGER NULL,
    `water_level_max` INTEGER NULL,
    `tehsil_coordinates` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `States` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `country_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Districts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `state_id` INTEGER NOT NULL,
    `country_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Fields` ADD CONSTRAINT `Fields_tehsil_id_fkey` FOREIGN KEY (`tehsil_id`) REFERENCES `Tehsils`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fields` ADD CONSTRAINT `Fields_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fields` ADD CONSTRAINT `Fields_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `Districts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tehsils` ADD CONSTRAINT `Tehsils_district_id_fkey` FOREIGN KEY (`district_id`) REFERENCES `Districts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tehsils` ADD CONSTRAINT `Tehsils_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tehsils` ADD CONSTRAINT `Tehsils_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `Countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `States` ADD CONSTRAINT `States_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `Countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Districts` ADD CONSTRAINT `Districts_state_id_fkey` FOREIGN KEY (`state_id`) REFERENCES `States`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Districts` ADD CONSTRAINT `Districts_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `Countries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
