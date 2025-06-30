import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { NotFoundException } from "@/exceptions";
import { cartItemSchema } from "@/schemas";

export const findAll = async (userId: string) => {
    return await prisma.cartItem.findMany({ where: { userId } });
};
export const upsertItem = async (userId: string, data: cartItemSchema.AddToCartType) => {
    const existingItem = await prisma.cartItem.findFirst({
        where: { userId, productId: data.productId },
    });
    if (existingItem) {
        return {
            data: await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: { increment: 1 } },
            }),
            isNew: false,
        };
    }
    return {
        data: await prisma.cartItem.create({ data: { productId: data.productId, userId, quantity: 1 } }),
        isNew: true,
    };
};

export const incrementItem = async (userId: string, productId: string) => {
    try {
        return await prisma.cartItem.update({
            where: { userId_productId: { userId, productId } },
            data: { quantity: { increment: 1 } },
        });
    } catch (_error) {
        throw new NotFoundException("Cart item not found", ErrorCode.CART_ITEM_NOT_FOUND);
    }
};

export const decrementItem = async (userId: string, productId: string) => {
    try {
        const item = await prisma.cartItem.findUniqueOrThrow({ where: { userId_productId: { userId, productId } } });

        if (item.quantity <= 1) {
            return {
                data: await prisma.cartItem.delete({ where: { id: item.id } }),
                updated: false,
            };
        }
        return {
            data: await prisma.cartItem.update({
                where: { id: item.id },
                data: { quantity: { decrement: 1 } },
            }),
            updated: true,
        };
    } catch (_error) {
        throw new NotFoundException("Cart item not found", ErrorCode.CART_ITEM_NOT_FOUND);
    }
};

export const removeItem = async (userId: string, productId: string) => {
    try {
        return await prisma.cartItem.delete({ where: { userId_productId: { userId, productId } } });
    } catch (_error) {
        throw new NotFoundException("Cart item not found", ErrorCode.CART_ITEM_NOT_FOUND);
    }
};

export const removeAll = async (userId: string) => {
    return await prisma.cartItem.deleteMany({ where: { userId } });
};
