/*
  Warnings:

  - Made the column `note` on table `producthistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `producthistory` MODIFY `note` VARCHAR(191) NOT NULL;
