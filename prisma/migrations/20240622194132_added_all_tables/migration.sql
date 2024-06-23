/*
  Warnings:

  - Made the column `tehsil_coordinates` on table `Tehsils` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `DiseaseAndPest` MODIFY `disease_date` INTEGER NULL,
    MODIFY `cost` INTEGER NULL,
    MODIFY `male_labour_hours` INTEGER NULL,
    MODIFY `female_labour_hours` INTEGER NULL,
    MODIFY `quantity` INTEGER NULL,
    MODIFY `cost_per_acer` INTEGER NULL;

-- AlterTable
ALTER TABLE `FarmerCrop` MODIFY `total_quantity` INTEGER NULL,
    MODIFY `total_price` INTEGER NULL,
    MODIFY `price_per_kg` INTEGER NULL;

-- AlterTable
ALTER TABLE `Fertilizer` MODIFY `fertilizer_date` INTEGER NULL,
    MODIFY `male_labour_hours` INTEGER NULL,
    MODIFY `female_labour_hours` INTEGER NULL,
    MODIFY `quantity` INTEGER NULL,
    MODIFY `fertilizer_cost` INTEGER NULL,
    MODIFY `cost_per_acer` INTEGER NULL;

-- AlterTable
ALTER TABLE `Fields` MODIFY `organic_acres_farmed_again` INTEGER NULL,
    MODIFY `area_changed_into_organic` INTEGER NULL,
    MODIFY `traditional_farmed_cotton_area` INTEGER NULL,
    MODIFY `other_farmed_area` INTEGER NULL,
    MODIFY `production_forecast` INTEGER NULL,
    MODIFY `country_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Harvesting` MODIFY `est_yield` INTEGER NULL,
    MODIFY `harvested_yield` INTEGER NULL,
    MODIFY `male_labour_hours` INTEGER NULL,
    MODIFY `female_labour_hours` INTEGER NULL,
    MODIFY `cost_per_acer` INTEGER NULL,
    MODIFY `total_cost` INTEGER NULL;

-- AlterTable
ALTER TABLE `Irrigation` MODIFY `male_labour_hours` INTEGER NULL,
    MODIFY `female_labour_hours` INTEGER NULL,
    MODIFY `unit_m3` INTEGER NULL,
    MODIFY `cost_acre` INTEGER NULL;

-- AlterTable
ALTER TABLE `IssueDetected` MODIFY `issue_date` INTEGER NULL,
    MODIFY `male_labour_hours` INTEGER NULL,
    MODIFY `female_labour_hours` INTEGER NULL,
    MODIFY `issue_cost` INTEGER NULL,
    MODIFY `cost_per_acer` INTEGER NULL;

-- AlterTable
ALTER TABLE `MotorTubeWell` MODIFY `repairing_costs` INTEGER NULL,
    MODIFY `manageing_hours` INTEGER NULL,
    MODIFY `diesel_quantity` INTEGER NULL,
    MODIFY `costs_per_hour` INTEGER NULL,
    MODIFY `costs_per_liter` INTEGER NULL;

-- AlterTable
ALTER TABLE `PreparationOfField` MODIFY `male_labour_hours` INTEGER NULL,
    MODIFY `female_labour_hours` INTEGER NULL;

-- AlterTable
ALTER TABLE `SolarTubeWell` MODIFY `repairing_costs` INTEGER NULL,
    MODIFY `manageing_hours` INTEGER NULL,
    MODIFY `costs_per_hour` INTEGER NULL;

-- AlterTable
ALTER TABLE `Sowing` MODIFY `male_labour_hours` INTEGER NULL,
    MODIFY `female_labour_hours` INTEGER NULL,
    MODIFY `kg_sown` INTEGER NULL,
    MODIFY `price_per_kg` INTEGER NULL;

-- AlterTable
ALTER TABLE `Tehsils` MODIFY `tehsil_coordinates` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `WeedTreatment` MODIFY `weed_date` INTEGER NULL,
    MODIFY `quantity` INTEGER NULL,
    MODIFY `male_labour_hours` INTEGER NULL,
    MODIFY `female_labour_hours` INTEGER NULL,
    MODIFY `cost_per_acer` INTEGER NULL;
