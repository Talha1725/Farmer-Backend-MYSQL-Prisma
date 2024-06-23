-- AlterTable
ALTER TABLE `Fields` ADD COLUMN `farmerSawie_nr` INTEGER NOT NULL DEFAULT 4855;

-- AddForeignKey
ALTER TABLE `Fields` ADD CONSTRAINT `Fields_farmerSawie_nr_fkey` FOREIGN KEY (`farmerSawie_nr`) REFERENCES `Farmer`(`sawie_nr`) ON DELETE RESTRICT ON UPDATE CASCADE;
