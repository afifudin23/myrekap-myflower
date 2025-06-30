import prisma from "@/config/database";

export const findAll = async (userId: string) => {
    return await prisma.cartItem.findMany({ where: { userId } });
};
export const upsertItem = async () => {};
export const removeItem = async () => {};
export const removeAll = async () => {};
