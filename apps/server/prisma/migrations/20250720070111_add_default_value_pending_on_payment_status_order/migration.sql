-- AlterTable
ALTER TABLE `orders` MODIFY `payment_status` ENUM('pending', 'unpaid', 'paid', 'canceled', 'expired', 'refunded', 'denied') NOT NULL DEFAULT 'pending';
