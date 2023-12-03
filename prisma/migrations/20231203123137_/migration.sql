-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(191) NULL,
    `first_login` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Karyawan` (
    `karyawan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NULL,
    `birth_place` VARCHAR(191) NULL,
    `birth_date` DATETIME(3) NULL,
    `handphone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `department` VARCHAR(191) NULL,

    PRIMARY KEY (`karyawan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kriteria` (
    `kriteria_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kriteria_name_key`(`name`),
    PRIMARY KEY (`kriteria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subkriteria` (
    `subkriteria_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `kriteriaKriteria_id` INTEGER NULL,

    PRIMARY KEY (`subkriteria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryKriteria` (
    `category_kriteria_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `periode` DATETIME(3) NOT NULL,

    PRIMARY KEY (`category_kriteria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alternatif` (
    `alternatif_id` INTEGER NOT NULL AUTO_INCREMENT,
    `total` INTEGER NOT NULL,
    `karyawanKaryawan_id` INTEGER NULL,
    `categoryKriteriaCategory_kriteria_id` INTEGER NULL,

    PRIMARY KEY (`alternatif_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BobotKriteria` (
    `bobot_kriteria_id` INTEGER NOT NULL AUTO_INCREMENT,
    `kriteriaKriteria_id` INTEGER NULL,
    `categoryKriteriaCategory_kriteria_id` INTEGER NULL,

    PRIMARY KEY (`bobot_kriteria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BobotSubkriteria` (
    `bobot_subkriteria_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subkriteriaSubkriteria_id` INTEGER NULL,
    `categoryKriteriaCategory_kriteria_id` INTEGER NULL,

    PRIMARY KEY (`bobot_subkriteria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BobotAlternatif` (
    `bobot_alternatif_id` INTEGER NOT NULL AUTO_INCREMENT,
    `kriteriaKriteria_id` INTEGER NULL,
    `subkriteriaSubkriteria_id` INTEGER NULL,
    `alternatifAlternatif_id` INTEGER NULL,

    PRIMARY KEY (`bobot_alternatif_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subkriteria` ADD CONSTRAINT `Subkriteria_kriteriaKriteria_id_fkey` FOREIGN KEY (`kriteriaKriteria_id`) REFERENCES `Kriteria`(`kriteria_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alternatif` ADD CONSTRAINT `Alternatif_karyawanKaryawan_id_fkey` FOREIGN KEY (`karyawanKaryawan_id`) REFERENCES `Karyawan`(`karyawan_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alternatif` ADD CONSTRAINT `Alternatif_categoryKriteriaCategory_kriteria_id_fkey` FOREIGN KEY (`categoryKriteriaCategory_kriteria_id`) REFERENCES `CategoryKriteria`(`category_kriteria_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BobotKriteria` ADD CONSTRAINT `BobotKriteria_kriteriaKriteria_id_fkey` FOREIGN KEY (`kriteriaKriteria_id`) REFERENCES `Kriteria`(`kriteria_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BobotKriteria` ADD CONSTRAINT `BobotKriteria_categoryKriteriaCategory_kriteria_id_fkey` FOREIGN KEY (`categoryKriteriaCategory_kriteria_id`) REFERENCES `CategoryKriteria`(`category_kriteria_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BobotSubkriteria` ADD CONSTRAINT `BobotSubkriteria_subkriteriaSubkriteria_id_fkey` FOREIGN KEY (`subkriteriaSubkriteria_id`) REFERENCES `Subkriteria`(`subkriteria_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BobotSubkriteria` ADD CONSTRAINT `BobotSubkriteria_categoryKriteriaCategory_kriteria_id_fkey` FOREIGN KEY (`categoryKriteriaCategory_kriteria_id`) REFERENCES `CategoryKriteria`(`category_kriteria_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BobotAlternatif` ADD CONSTRAINT `BobotAlternatif_kriteriaKriteria_id_fkey` FOREIGN KEY (`kriteriaKriteria_id`) REFERENCES `Kriteria`(`kriteria_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BobotAlternatif` ADD CONSTRAINT `BobotAlternatif_subkriteriaSubkriteria_id_fkey` FOREIGN KEY (`subkriteriaSubkriteria_id`) REFERENCES `Subkriteria`(`subkriteria_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BobotAlternatif` ADD CONSTRAINT `BobotAlternatif_alternatifAlternatif_id_fkey` FOREIGN KEY (`alternatifAlternatif_id`) REFERENCES `Alternatif`(`alternatif_id`) ON DELETE SET NULL ON UPDATE CASCADE;
