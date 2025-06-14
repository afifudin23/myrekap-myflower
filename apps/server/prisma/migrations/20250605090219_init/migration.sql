-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `pin` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'SUPERADMIN') NOT NULL DEFAULT 'ADMIN',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_summaries` (
    `id` VARCHAR(191) NOT NULL,
    `customer_name` VARCHAR(191) NOT NULL,
    `flower_category` ENUM('tafel_bouquet', 'bouquet', 'hands_bouquet', 'krans', 'tutup_peti', 'bunga_papan', 'paper_flower', 'bunga_balon', 'bloombox') NOT NULL,
    `quantity` INTEGER NOT NULL,
    `greeting_message` VARCHAR(191) NOT NULL,
    `order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delivery_date` DATETIME(3) NOT NULL,
    `delivery_address` VARCHAR(191) NOT NULL,
    `customer_category` ENUM('umum', 'pemda', 'akademik', 'rumah_sakit', 'polisi_militer', 'perbankan') NOT NULL,
    `price` INTEGER NOT NULL,
    `shipping_cost` INTEGER NOT NULL,
    `is_paid` BOOLEAN NOT NULL,
    `payment_method` ENUM('transfer', 'cash', 'pending') NULL,
    `payment_status` ENUM('lunas', 'belum_lunas', 'batal') NOT NULL,
    `order_status` ENUM('terkirim', 'in_process', 'dibatalkan') NOT NULL DEFAULT 'in_process',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_proofs` (
    `id` VARCHAR(191) NOT NULL,
    `file_name` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `secure_url` VARCHAR(191) NOT NULL,
    `order_summary_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `payment_proofs_order_summary_id_key`(`order_summary_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payment_proofs` ADD CONSTRAINT `payment_proofs_order_summary_id_fkey` FOREIGN KEY (`order_summary_id`) REFERENCES `order_summaries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
