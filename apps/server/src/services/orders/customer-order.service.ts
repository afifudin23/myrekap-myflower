import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { NotFoundException } from "@/exceptions";

export const create = async () => {};
export const findAllByUser = async (userId: string) => {
    const data = await prisma.order.findMany({ where: { userId } });
    return data;
};
export const findByIdAndUser = async (userId: string, orderId: string) => {
    try {
        const data = await prisma.order.findFirstOrThrow({ where: { id: orderId, userId } });
        return data;
    } catch (_error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};
export const cancel = async () => {};
export const confirm = async () => {};
