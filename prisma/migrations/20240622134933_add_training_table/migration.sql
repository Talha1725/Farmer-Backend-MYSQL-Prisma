-- CreateTable
CREATE TABLE `Training` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `month` VARCHAR(191) NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `trainer_name` VARCHAR(191) NOT NULL,
    `idea` VARCHAR(191) NOT NULL,
    `farmerSawie_nr` INTEGER NOT NULL,

    UNIQUE INDEX `Training_farmerSawie_nr_key`(`farmerSawie_nr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Training` ADD CONSTRAINT `Training_farmerSawie_nr_fkey` FOREIGN KEY (`farmerSawie_nr`) REFERENCES `Farmer`(`sawie_nr`) ON DELETE RESTRICT ON UPDATE CASCADE;
