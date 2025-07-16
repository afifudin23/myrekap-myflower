/*
  Warnings:

  - You are about to drop the column `greeting_message` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order_items` DROP COLUMN `greeting_message`,
    ADD COLUMN `message` VARCHAR(191) NULL;
