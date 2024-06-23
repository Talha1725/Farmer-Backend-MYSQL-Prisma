-- AlterTable
ALTER TABLE `Countries` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Crop` MODIFY `crop_name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CropVariety` MODIFY `variety_name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Districts` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Farmer` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `father_name` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `state` VARCHAR(191) NULL,
    MODIFY `tehsil` VARCHAR(191) NULL,
    MODIFY `district` VARCHAR(191) NULL,
    MODIFY `farmer_address` VARCHAR(191) NULL,
    MODIFY `labour_costs_female` VARCHAR(191) NULL,
    MODIFY `labour_costs_male` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `FarmerContactPerson` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Fertilizer` MODIFY `type_of_fertilizer` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Fields` MODIFY `special_farm_processing_aability` VARCHAR(191) NULL,
    MODIFY `land_preparation` VARCHAR(191) NULL,
    MODIFY `bio_gas_plant` VARCHAR(191) NULL,
    MODIFY `border_crop` VARCHAR(191) NULL,
    MODIFY `clear_election` VARCHAR(191) NULL,
    MODIFY `conversion_of_organisms` VARCHAR(191) NULL,
    MODIFY `green_fertilizer` VARCHAR(191) NULL,
    MODIFY `inter_crop` VARCHAR(191) NULL,
    MODIFY `mapped_digitalized` VARCHAR(191) NULL,
    MODIFY `method_of_irrigation` VARCHAR(191) NULL,
    MODIFY `michung` VARCHAR(191) NULL,
    MODIFY `rain_water` VARCHAR(191) NULL,
    MODIFY `trap_crop` VARCHAR(191) NULL,
    MODIFY `trees_at_edge` VARCHAR(191) NULL,
    MODIFY `field_address` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `IssueDetected` MODIFY `issue_name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `States` MODIFY `name` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `SuperVisor` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `number` VARCHAR(191) NULL,
    MODIFY `company` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Tehsils` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `tehsil_coordinates` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Training` MODIFY `month` VARCHAR(191) NULL,
    MODIFY `topic` VARCHAR(191) NULL,
    MODIFY `trainer_name` VARCHAR(191) NULL,
    MODIFY `idea` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `WeedTreatment` MODIFY `activity` VARCHAR(191) NULL,
    MODIFY `title_of_product` VARCHAR(191) NULL;
