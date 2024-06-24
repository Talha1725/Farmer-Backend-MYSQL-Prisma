-- AlterTable
ALTER TABLE `Farmer` MODIFY `farmer_contact_person_id` INTEGER NOT NULL DEFAULT 1,
    MODIFY `super_visor_id` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Farmer` ADD CONSTRAINT `Farmer_super_visor_id_fkey` FOREIGN KEY (`super_visor_id`) REFERENCES `SuperVisor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Farmer` ADD CONSTRAINT `Farmer_farmer_contact_person_id_fkey` FOREIGN KEY (`farmer_contact_person_id`) REFERENCES `FarmerContactPerson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
