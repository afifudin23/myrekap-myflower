/*
  Warnings:

  - You are about to drop the column `customerCatgory` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `users` table. All the data in the column will be lost.
  - Added the required column `full_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `customerCatgory`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `customer_category` ENUM('umum', 'pemda', 'akademik', 'rumah_sakit', 'polisi_militer', 'perbankan') NULL,
    ADD COLUMN `full_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL;
