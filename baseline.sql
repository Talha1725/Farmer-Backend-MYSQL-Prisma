-- DropForeignKey
ALTER TABLE `DiseaseAndPest` DROP FOREIGN KEY `DiseaseAndPest_field_id_fkey`;

-- DropForeignKey
ALTER TABLE `Districts` DROP FOREIGN KEY `Districts_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `Districts` DROP FOREIGN KEY `Districts_state_id_fkey`;

-- DropForeignKey
ALTER TABLE `Farmer` DROP FOREIGN KEY `Farmer_farmer_contact_person_id_fkey`;

-- DropForeignKey
ALTER TABLE `Farmer` DROP FOREIGN KEY `Farmer_super_visor_id_fkey`;

-- DropForeignKey
ALTER TABLE `FarmerCrop` DROP FOREIGN KEY `FarmerCrop_crop_id_fkey`;

-- DropForeignKey
ALTER TABLE `FarmerCrop` DROP FOREIGN KEY `FarmerCrop_crop_variety_id_fkey`;

-- DropForeignKey
ALTER TABLE `FarmerCrop` DROP FOREIGN KEY `FarmerCrop_farmerSawie_nr_fkey`;

-- DropForeignKey
ALTER TABLE `Fertilizer` DROP FOREIGN KEY `Fertilizer_field_id_fkey`;

-- DropForeignKey
ALTER TABLE `Fields` DROP FOREIGN KEY `Fields_district_id_fkey`;

-- DropForeignKey
ALTER TABLE `Fields` DROP FOREIGN KEY `Fields_farmerSawie_nr_fkey`;

-- DropForeignKey
ALTER TABLE `Fields` DROP FOREIGN KEY `Fields_state_id_fkey`;

-- DropForeignKey
ALTER TABLE `Fields` DROP FOREIGN KEY `Fields_tehsil_id_fkey`;

-- DropForeignKey
ALTER TABLE `Harvesting` DROP FOREIGN KEY `Harvesting_field_id_fkey`;

-- DropForeignKey
ALTER TABLE `Irrigation` DROP FOREIGN KEY `Irrigation_field_id_fkey`;

-- DropForeignKey
ALTER TABLE `IssueDetected` DROP FOREIGN KEY `IssueDetected_field_id_fkey`;

-- DropForeignKey
ALTER TABLE `MotorTubeWell` DROP FOREIGN KEY `MotorTubeWell_farmerSawie_nr_fkey`;

-- DropForeignKey
ALTER TABLE `PreparationOfField` DROP FOREIGN KEY `PreparationOfField_field_id_fkey`;

-- DropForeignKey
ALTER TABLE `SolarTubeWell` DROP FOREIGN KEY `SolarTubeWell_farmerSawie_nr_fkey`;

-- DropForeignKey
ALTER TABLE `Sowing` DROP FOREIGN KEY `Sowing_crop_id_fkey`;

-- DropForeignKey
ALTER TABLE `Sowing` DROP FOREIGN KEY `Sowing_crop_variety_id_fkey`;

-- DropForeignKey
ALTER TABLE `States` DROP FOREIGN KEY `States_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `Tehsils` DROP FOREIGN KEY `Tehsils_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `Tehsils` DROP FOREIGN KEY `Tehsils_district_id_fkey`;

-- DropForeignKey
ALTER TABLE `Tehsils` DROP FOREIGN KEY `Tehsils_state_id_fkey`;

-- DropForeignKey
ALTER TABLE `Training` DROP FOREIGN KEY `Training_farmerSawie_nr_fkey`;

-- DropForeignKey
ALTER TABLE `WeedTreatment` DROP FOREIGN KEY `WeedTreatment_field_id_fkey`;

-- DropTable
DROP TABLE `Countries`;

-- DropTable
DROP TABLE `Crop`;

-- DropTable
DROP TABLE `CropVariety`;

-- DropTable
DROP TABLE `DiseaseAndPest`;

-- DropTable
DROP TABLE `Districts`;

-- DropTable
DROP TABLE `Farmer`;

-- DropTable
DROP TABLE `FarmerContactPerson`;

-- DropTable
DROP TABLE `FarmerCrop`;

-- DropTable
DROP TABLE `Fertilizer`;

-- DropTable
DROP TABLE `Fields`;

-- DropTable
DROP TABLE `Harvesting`;

-- DropTable
DROP TABLE `Irrigation`;

-- DropTable
DROP TABLE `IssueDetected`;

-- DropTable
DROP TABLE `MotorTubeWell`;

-- DropTable
DROP TABLE `PreparationOfField`;

-- DropTable
DROP TABLE `SolarTubeWell`;

-- DropTable
DROP TABLE `Sowing`;

-- DropTable
DROP TABLE `States`;

-- DropTable
DROP TABLE `SuperVisor`;

-- DropTable
DROP TABLE `Tehsils`;

-- DropTable
DROP TABLE `Training`;

-- DropTable
DROP TABLE `WeedTreatment`;

