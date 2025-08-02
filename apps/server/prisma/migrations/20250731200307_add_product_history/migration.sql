/*
  Warnings:

  - A unique constraint covering the columns `[product_code]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_code` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `product_code` VARCHAR(191) NOT NULL,
    MODIFY `stock` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `ProductHistory` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `type` ENUM('stock_in', 'stock_out') NOT NULL,
    `quantity` INTEGER NOT NULL,
    `note` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `products_product_code_key` ON `products`(`product_code`);

-- AddForeignKey
ALTER TABLE `ProductHistory` ADD CONSTRAINT `ProductHistory_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
