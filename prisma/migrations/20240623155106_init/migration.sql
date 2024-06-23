/*
  Warnings:

  - You are about to drop the column `crop_id` on the `CropVariety` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `CropVariety` DROP FOREIGN KEY `CropVariety_crop_id_fkey`;

-- AlterTable
ALTER TABLE `CropVariety` DROP COLUMN `crop_id`;
