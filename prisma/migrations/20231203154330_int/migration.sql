/*
  Warnings:

  - Made the column `gender` on table `Karyawan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Karyawan` MODIFY `gender` ENUM('Pria', 'Wanita') NOT NULL;
