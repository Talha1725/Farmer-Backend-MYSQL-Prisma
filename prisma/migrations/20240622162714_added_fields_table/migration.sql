/*
  Warnings:

  - A unique constraint covering the columns `[crop_id]` on the table `Fields` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `activities` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio_gas_plant` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `border_crop` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clear_election` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completion_date` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conversion_of_organisms` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crop_id` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `female_labour_hours` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `green_fertilizer` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inter_crop` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelalized` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `male_labour_hours` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mapped_digitalized` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method_of_irrigation` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `michung` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownership` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rain_water` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trap_crop` to the `Fields` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trees_at_edge` to the `Fields` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Fields` ADD COLUMN `activities` ENUM('manual', 'mechanical') NOT NULL,
    ADD COLUMN `bio_gas_plant` VARCHAR(191) NOT NULL,
    ADD COLUMN `border_crop` VARCHAR(191) NOT NULL,
    ADD COLUMN `clear_election` VARCHAR(191) NOT NULL,
    ADD COLUMN `completion_date` DATETIME(3) NOT NULL,
    ADD COLUMN `conversion_of_organisms` VARCHAR(191) NOT NULL,
    ADD COLUMN `crop_id` INTEGER NOT NULL,
    ADD COLUMN `female_labour_hours` INTEGER NOT NULL,
    ADD COLUMN `green_fertilizer` VARCHAR(191) NOT NULL,
    ADD COLUMN `inter_crop` VARCHAR(191) NOT NULL,
    ADD COLUMN `levelalized` BOOLEAN NOT NULL,
    ADD COLUMN `male_labour_hours` INTEGER NOT NULL,
    ADD COLUMN `mapped_digitalized` VARCHAR(191) NOT NULL,
    ADD COLUMN `method_of_irrigation` VARCHAR(191) NOT NULL,
    ADD COLUMN `michung` VARCHAR(191) NOT NULL,
    ADD COLUMN `ownership` ENUM('self_owned', 'family_member', 'on_lease') NOT NULL,
    ADD COLUMN `rain_water` VARCHAR(191) NOT NULL,
    ADD COLUMN `trap_crop` VARCHAR(191) NOT NULL,
    ADD COLUMN `trees_at_edge` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Fields_crop_id_key` ON `Fields`(`crop_id`);

-- AddForeignKey
ALTER TABLE `Fields` ADD CONSTRAINT `Fields_crop_id_fkey` FOREIGN KEY (`crop_id`) REFERENCES `Crop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
