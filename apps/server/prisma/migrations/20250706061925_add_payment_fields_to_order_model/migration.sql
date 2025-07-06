/*
  Warnings:

  - The values [transfer] on the enum `orders_payment_method` will be removed. If these variants are still used in the database, this will fail.
  - The values [failed] on the enum `orders_previous_payment_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [failed] on the enum `orders_previous_payment_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `payment_provider` VARCHAR(191) NULL,
    MODIFY `payment_method` ENUM('bank_transfer', 'cash', 'gateway', 'cod', 'credit_card', 'cstore', 'qris', 'ewallet') NULL,
    MODIFY `payment_status` ENUM('pending', 'unpaid', 'paid', 'cancelled', 'expired', 'refunded', 'denied') NOT NULL,
    MODIFY `previous_payment_status` ENUM('pending', 'unpaid', 'paid', 'cancelled', 'expired', 'refunded', 'denied') NULL;
