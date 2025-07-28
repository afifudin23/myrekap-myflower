-- AlterTable
ALTER TABLE `users` ADD COLUMN `is_verified` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `user_tokens` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `type` ENUM('verify_email', 'reset_password') NOT NULL,
    `is_used` BOOLEAN NOT NULL DEFAULT false,
    `expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `user_tokens_user_id_token_is_used_idx`(`user_id`, `token`, `is_used`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_tokens` ADD CONSTRAINT `user_tokens_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
