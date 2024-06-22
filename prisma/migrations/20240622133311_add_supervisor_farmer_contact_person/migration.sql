-- CreateTable
CREATE TABLE `Farmer` (
    `sawie_nr` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `father_name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `tehsil` VARCHAR(191) NOT NULL,
    `district` VARCHAR(191) NOT NULL,
    `farmer_address` VARCHAR(191) NOT NULL,
    `farmer_contact_person_id` INTEGER NOT NULL,
    `super_visor_id` INTEGER NOT NULL,

    UNIQUE INDEX `Farmer_father_name_key`(`father_name`),
    UNIQUE INDEX `Farmer_farmer_contact_person_id_key`(`farmer_contact_person_id`),
    UNIQUE INDEX `Farmer_super_visor_id_key`(`super_visor_id`),
    PRIMARY KEY (`sawie_nr`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FarmerContactPerson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SuperVisor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('field_book_responsible', 'field_trainer', 'assistant') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Farmer` ADD CONSTRAINT `Farmer_farmer_contact_person_id_fkey` FOREIGN KEY (`farmer_contact_person_id`) REFERENCES `FarmerContactPerson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Farmer` ADD CONSTRAINT `Farmer_super_visor_id_fkey` FOREIGN KEY (`super_visor_id`) REFERENCES `SuperVisor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
