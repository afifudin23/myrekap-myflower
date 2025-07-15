/*
  Warnings:

  - The values [cancelled] on the enum `orders_order_status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `phone_number` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `phone_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `source` ENUM('myrekap', 'myflower') NOT NULL,
    MODIFY `order_status` ENUM('in_process', 'completed', 'canceled') NOT NULL DEFAULT 'in_process';
