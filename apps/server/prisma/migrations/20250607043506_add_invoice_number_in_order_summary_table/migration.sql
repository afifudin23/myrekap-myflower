/*
  Warnings:

  - A unique constraint covering the columns `[invoice_number]` on the table `order_summaries` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `invoice_number` to the `order_summaries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order_summaries` ADD COLUMN `invoice_number` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `order_summaries_invoice_number_key` ON `order_summaries`(`invoice_number`);
