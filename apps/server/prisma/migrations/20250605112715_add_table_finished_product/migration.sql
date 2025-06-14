-- CreateTable
CREATE TABLE `finished_products` (
    `id` VARCHAR(191) NOT NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `secure_url` VARCHAR(191) NOT NULL,
    `order_summary_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `finished_products_order_summary_id_key`(`order_summary_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `finished_products` ADD CONSTRAINT `finished_products_order_summary_id_fkey` FOREIGN KEY (`order_summary_id`) REFERENCES `order_summaries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
