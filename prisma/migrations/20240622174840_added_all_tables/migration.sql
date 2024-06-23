/*
  Warnings:

  - You are about to drop the column `activities` on the `Fields` table. All the data in the column will be lost.
  - You are about to drop the column `completion_date` on the `Fields` table. All the data in the column will be lost.
  - You are about to drop the column `female_labour_hours` on the `Fields` table. All the data in the column will be lost.
  - You are about to drop the column `levelalized` on the `Fields` table. All the data in the column will be lost.
  - You are about to drop the column `male_labour_hours` on the `Fields` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[preparation_of_field_id]` on the table `Fields` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `preparation_of_field_id` to the `Fields` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Fields` DROP COLUMN `activities`,
    DROP COLUMN `completion_date`,
    DROP COLUMN `female_labour_hours`,
    DROP COLUMN `levelalized`,
    DROP COLUMN `male_labour_hours`,
    ADD COLUMN `preparation_of_field_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `PreparationOfField` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `levelalized` BOOLEAN NOT NULL,
    `completion_date` DATETIME(3) NOT NULL,
    `activities` ENUM('manual', 'mechanical') NOT NULL,
    `male_labour_hours` INTEGER NOT NULL,
    `female_labour_hours` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sowing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sowing_date` DATETIME(3) NOT NULL,
    `crop_id` INTEGER NOT NULL,
    `crop_variety_id` INTEGER NOT NULL,
    `male_labour_hours` INTEGER NOT NULL,
    `female_labour_hours` INTEGER NOT NULL,
    `kg_sown` INTEGER NOT NULL,
    `price_per_kg` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Irrigation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `irrigation_date` DATETIME(3) NOT NULL,
    `male_labour_hours` INTEGER NOT NULL,
    `female_labour_hours` INTEGER NOT NULL,
    `unit_m3` INTEGER NOT NULL,
    `source_of_irrigation` ENUM('solar_tube_well', 'motor_tube_well', 'canal') NOT NULL,
    `cost_acre` INTEGER NOT NULL,
    `field_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeedTreatment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `weed_date` INTEGER NOT NULL,
    `activity` VARCHAR(191) NOT NULL,
    `title_of_product` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `quantity_unit` ENUM('liter', 'kg') NOT NULL,
    `male_labour_hours` INTEGER NOT NULL,
    `female_labour_hours` INTEGER NOT NULL,
    `cost_per_acer` INTEGER NOT NULL,
    `field_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fertilizer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fertilizer_date` INTEGER NOT NULL,
    `male_labour_hours` INTEGER NOT NULL,
    `female_labour_hours` INTEGER NOT NULL,
    `type_of_fertilizer` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `quantity_unit` ENUM('liter', 'kg') NOT NULL,
    `fertilizer_cost` INTEGER NOT NULL,
    `cost_per_acer` INTEGER NOT NULL,
    `field_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IssueDetected` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `issue_date` INTEGER NOT NULL,
    `issue_name` VARCHAR(191) NOT NULL,
    `issue_calssification` ENUM('disease', 'insect', 'soil', 'water', 'temperature') NOT NULL,
    `male_labour_hours` INTEGER NOT NULL,
    `female_labour_hours` INTEGER NOT NULL,
    `issue_cost` INTEGER NOT NULL,
    `cost_per_acer` INTEGER NOT NULL,
    `field_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiseaseAndPest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `disease_date` INTEGER NOT NULL,
    `cost` INTEGER NOT NULL,
    `product` ENUM('Product1', 'Product2', 'Product3', 'Product4') NOT NULL,
    `male_labour_hours` INTEGER NOT NULL,
    `female_labour_hours` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `quantity_unit` ENUM('liter', 'kg') NOT NULL,
    `cost_per_acer` INTEGER NOT NULL,
    `field_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Harvesting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `est_date_of_harvesting` DATETIME(3) NOT NULL,
    `date_of_completion` DATETIME(3) NOT NULL,
    `est_yield` INTEGER NOT NULL,
    `harvested_yield` INTEGER NOT NULL,
    `male_labour_hours` INTEGER NOT NULL,
    `female_labour_hours` INTEGER NOT NULL,
    `cost_per_acer` INTEGER NOT NULL,
    `field_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Fields_preparation_of_field_id_key` ON `Fields`(`preparation_of_field_id`);

-- AddForeignKey
ALTER TABLE `Fields` ADD CONSTRAINT `Fields_preparation_of_field_id_fkey` FOREIGN KEY (`preparation_of_field_id`) REFERENCES `PreparationOfField`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sowing` ADD CONSTRAINT `Sowing_crop_id_fkey` FOREIGN KEY (`crop_id`) REFERENCES `Crop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sowing` ADD CONSTRAINT `Sowing_crop_variety_id_fkey` FOREIGN KEY (`crop_variety_id`) REFERENCES `CropVariety`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Irrigation` ADD CONSTRAINT `Irrigation_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeedTreatment` ADD CONSTRAINT `WeedTreatment_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fertilizer` ADD CONSTRAINT `Fertilizer_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IssueDetected` ADD CONSTRAINT `IssueDetected_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiseaseAndPest` ADD CONSTRAINT `DiseaseAndPest_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Harvesting` ADD CONSTRAINT `Harvesting_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
