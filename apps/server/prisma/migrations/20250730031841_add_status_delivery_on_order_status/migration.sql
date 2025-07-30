-- AlterTable
ALTER TABLE `orders` MODIFY `order_status` ENUM('in_process', 'delivery', 'completed', 'canceled') NOT NULL DEFAULT 'in_process';
