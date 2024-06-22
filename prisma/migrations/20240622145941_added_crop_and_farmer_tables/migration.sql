/*
  Warnings:

  - Added the required column `labour_costs_female` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `labour_costs_male` to the `Farmer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Farmer` ADD COLUMN `labour_costs_female` VARCHAR(191) NOT NULL,
    ADD COLUMN `labour_costs_male` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `FarmerCrop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `farmerSawie_nr` INTEGER NOT NULL,
    `crop_id` INTEGER NOT NULL,
    `variety` VARCHAR(191) NOT NULL,
    `crop_type` ENUM('organic', 'traditional') NOT NULL,
    `date_of_purchasing` DATETIME(3) NOT NULL,
    `source` ENUM('by_myself', 'market_address') NOT NULL,
    `total_quantity` INTEGER NOT NULL,
    `total_price` INTEGER NOT NULL,
    `price_per_kg` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fields` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `regen_farming` ENUM('registered', 'transition_phase', 'have_certificate') NOT NULL,
    `special_farm_storage_aability` ENUM('no_storing', 'temp_warehouse', 'perm_warehouse', 'transition_bags_available') NOT NULL,
    `special_farm_processing_aability` VARCHAR(191) NOT NULL,
    `land_preparation` VARCHAR(191) NOT NULL,
    `organic_acres_farmed_again` INTEGER NOT NULL,
    `area_changed_into_organic` INTEGER NOT NULL,
    `traditional_farmed_cotton_area` INTEGER NOT NULL,
    `other_farmed_area` INTEGER NOT NULL,
    `production_forecast` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Crop` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `crop_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FarmerCrop` ADD CONSTRAINT `FarmerCrop_farmerSawie_nr_fkey` FOREIGN KEY (`farmerSawie_nr`) REFERENCES `Farmer`(`sawie_nr`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FarmerCrop` ADD CONSTRAINT `FarmerCrop_crop_id_fkey` FOREIGN KEY (`crop_id`) REFERENCES `Crop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
