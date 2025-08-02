/*
  Warnings:

  - You are about to drop the `producthistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `producthistory` DROP FOREIGN KEY `ProductHistory_product_id_fkey`;

-- DropTable
DROP TABLE `producthistory`;

-- CreateTable
CREATE TABLE `product_histories` (
    `id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `type` ENUM('stock_in', 'stock_out') NOT NULL,
    `quantity` INTEGER NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_histories` ADD CONSTRAINT `product_histories_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
