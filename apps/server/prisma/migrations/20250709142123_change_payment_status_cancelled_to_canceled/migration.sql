/*
  Warnings:

  - You are about to drop the column `invoice_number` on the `orders` table. All the data in the column will be lost.
  - The values [cancelled] on the enum `orders_previous_payment_status` will be removed. If these variants are still used in the database, this will fail.
  - The values [cancelled] on the enum `orders_previous_payment_status` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[order_code]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_code` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `orders_invoice_number_key` ON `orders`;

-- AlterTable
ALTER TABLE `orders` DROP COLUMN `invoice_number`,
    ADD COLUMN `order_code` VARCHAR(191) NOT NULL,
    MODIFY `payment_status` ENUM('pending', 'unpaid', 'paid', 'canceled', 'expired', 'refunded', 'denied') NOT NULL,
    MODIFY `previous_payment_status` ENUM('pending', 'unpaid', 'paid', 'canceled', 'expired', 'refunded', 'denied') NULL;

-- CreateIndex
CREATE UNIQUE INDEX `orders_order_code_key` ON `orders`(`order_code`);
