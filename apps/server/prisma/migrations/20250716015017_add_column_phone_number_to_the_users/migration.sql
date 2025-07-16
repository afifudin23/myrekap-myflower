/*
  Warnings:

  - Added the required column `phoneNumber` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `phoneNumber` VARCHAR(191) NOT NULL;
