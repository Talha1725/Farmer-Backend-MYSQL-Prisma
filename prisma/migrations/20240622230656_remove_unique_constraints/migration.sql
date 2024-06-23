-- DropIndex
DROP INDEX `Farmer_farmer_contact_person_id_key` ON `Farmer`;

-- DropIndex
DROP INDEX `Farmer_super_visor_id_key` ON `Farmer`;

-- AlterTable
ALTER TABLE `Farmer` ADD COLUMN `test` VARCHAR(191) NOT NULL DEFAULT 'null';

-- AddForeignKey
ALTER TABLE `Farmer` ADD CONSTRAINT `Farmer_super_visor_id_fkey` FOREIGN KEY (`super_visor_id`) REFERENCES `SuperVisor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Farmer` ADD CONSTRAINT `Farmer_farmer_contact_person_id_fkey` FOREIGN KEY (`farmer_contact_person_id`) REFERENCES `FarmerContactPerson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
