-- AlterTable
ALTER TABLE `FarmerCrop` MODIFY `date_of_purchasing` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Harvesting` MODIFY `est_date_of_harvesting` VARCHAR(191) NULL,
    MODIFY `date_of_completion` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Irrigation` MODIFY `irrigation_date` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `MotorTubeWell` MODIFY `activity_date` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `PreparationOfField` MODIFY `completion_date` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `SolarTubeWell` MODIFY `activity_date` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Sowing` MODIFY `sowing_date` VARCHAR(191) NULL;
