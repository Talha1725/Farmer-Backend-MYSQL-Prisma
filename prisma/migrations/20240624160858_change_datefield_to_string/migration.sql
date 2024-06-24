/*
  Warnings:

  - You are about to alter the column `date_of_purchasing` on the `FarmerCrop` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `est_date_of_harvesting` on the `Harvesting` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `date_of_completion` on the `Harvesting` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `irrigation_date` on the `Irrigation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `activity_date` on the `MotorTubeWell` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `completion_date` on the `PreparationOfField` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `activity_date` on the `SolarTubeWell` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `sowing_date` on the `Sowing` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `FarmerCrop` MODIFY `date_of_purchasing` INTEGER NULL;

-- AlterTable
ALTER TABLE `Harvesting` MODIFY `est_date_of_harvesting` INTEGER NULL,
    MODIFY `date_of_completion` INTEGER NULL;

-- AlterTable
ALTER TABLE `Irrigation` MODIFY `irrigation_date` INTEGER NULL;

-- AlterTable
ALTER TABLE `MotorTubeWell` MODIFY `activity_date` INTEGER NULL;

-- AlterTable
ALTER TABLE `PreparationOfField` MODIFY `completion_date` INTEGER NULL;

-- AlterTable
ALTER TABLE `SolarTubeWell` MODIFY `activity_date` INTEGER NULL;

-- AlterTable
ALTER TABLE `Sowing` MODIFY `sowing_date` INTEGER NULL;
