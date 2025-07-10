/*
  Warnings:

  - The values [gateway] on the enum `orders_payment_method` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `payment_method` ENUM('cod', 'cash', 'bank_transfer', 'credit_card', 'cstore', 'qris', 'ewallet') NULL;
