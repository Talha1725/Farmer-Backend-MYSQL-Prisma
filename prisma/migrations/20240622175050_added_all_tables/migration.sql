/*
  Warnings:

  - Added the required column `mechanisation` to the `Harvesting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_cost` to the `Harvesting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Harvesting` ADD COLUMN `mechanisation` ENUM('manual', 'machines') NOT NULL,
    ADD COLUMN `total_cost` INTEGER NOT NULL;
