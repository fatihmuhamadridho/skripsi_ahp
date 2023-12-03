/*
  Warnings:

  - Added the required column `value` to the `BobotAlternatif` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `BobotKriteria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `BobotSubkriteria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `BobotAlternatif` ADD COLUMN `value` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `BobotKriteria` ADD COLUMN `value` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `BobotSubkriteria` ADD COLUMN `value` INTEGER NOT NULL;
