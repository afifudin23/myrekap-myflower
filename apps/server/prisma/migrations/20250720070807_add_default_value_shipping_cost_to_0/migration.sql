/*
  Warnings:

  - Made the column `shipping_cost` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `shipping_cost` INTEGER NOT NULL DEFAULT 0;
