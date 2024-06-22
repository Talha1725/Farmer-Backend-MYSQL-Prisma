/*
  Warnings:

  - You are about to drop the column `crop_type` on the `FarmerCrop` table. All the data in the column will be lost.
  - You are about to drop the column `variety` on the `FarmerCrop` table. All the data in the column will be lost.
  - Added the required column `crop_variety_id` to the `FarmerCrop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FarmerCrop` DROP COLUMN `crop_type`,
    DROP COLUMN `variety`,
    ADD COLUMN `crop_variety_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `CropVariety` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `variety_name` VARCHAR(191) NOT NULL,
    `crop_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SolarTubeWell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `farmerSawie_nr` INTEGER NOT NULL,
    `activity_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `repairing_costs` INTEGER NOT NULL,
    `manageing_hours` INTEGER NOT NULL,
    `costs_per_hour` INTEGER NOT NULL,

    UNIQUE INDEX `SolarTubeWell_farmerSawie_nr_key`(`farmerSawie_nr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MotorTubeWell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `farmerSawie_nr` INTEGER NOT NULL,
    `activity_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `repairing_costs` INTEGER NOT NULL,
    `manageing_hours` INTEGER NOT NULL,
    `diesel_quantity` INTEGER NOT NULL,
    `costs_per_hour` INTEGER NOT NULL,
    `costs_per_liter` INTEGER NOT NULL,

    UNIQUE INDEX `MotorTubeWell_farmerSawie_nr_key`(`farmerSawie_nr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FarmerCrop` ADD CONSTRAINT `FarmerCrop_crop_variety_id_fkey` FOREIGN KEY (`crop_variety_id`) REFERENCES `CropVariety`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CropVariety` ADD CONSTRAINT `CropVariety_crop_id_fkey` FOREIGN KEY (`crop_id`) REFERENCES `Crop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SolarTubeWell` ADD CONSTRAINT `SolarTubeWell_farmerSawie_nr_fkey` FOREIGN KEY (`farmerSawie_nr`) REFERENCES `Farmer`(`sawie_nr`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MotorTubeWell` ADD CONSTRAINT `MotorTubeWell_farmerSawie_nr_fkey` FOREIGN KEY (`farmerSawie_nr`) REFERENCES `Farmer`(`sawie_nr`) ON DELETE RESTRICT ON UPDATE CASCADE;
