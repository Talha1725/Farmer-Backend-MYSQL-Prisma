/*
  Warnings:

  - Added the required column `field_id` to the `PreparationOfField` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Fields` DROP FOREIGN KEY `Fields_preparation_of_field_id_fkey`;

-- AlterTable
ALTER TABLE `PreparationOfField` ADD COLUMN `field_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `PreparationOfField` ADD CONSTRAINT `PreparationOfField_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `Fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
