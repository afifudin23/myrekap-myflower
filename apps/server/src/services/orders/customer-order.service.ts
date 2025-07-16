import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, InternalException, NotFoundException } from "@/exceptions";
import { customerOrderSchema } from "@/schemas";
import { formmatters } from "@/utils";

export const create = async (userId: string, data: customerOrderSchema.CreateCustomerOrderType) => {
    const cartItems = await prisma.cartItem.findMany({ where: { userId }, include: { product: true } });
    if (cartItems.length === 0) {
        throw new BadRequestException("Cart must contain at least one item", ErrorCode.ORDER_MUST_CONTAIN_ITEMS);
    }

    const orderItems = cartItems.map((item) => {
        const message = data.messages.find((m) => m.productId === item.productId);
        if (!message) throw new NotFoundException(`Product not found `, ErrorCode.PRODUCT_NOT_FOUND);

        return {
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            message: message?.message,
            unitPrice: item.product.price,
            totalPrice: item.product.price * item.quantity,
        };
    });
    try {
        const totalPrice = orderItems.reduce((total, item) => total + item.totalPrice, 0);
        const { messages, ...orderData } = data;

        const order = await prisma.order.create({
            data: {
                ...orderData,
                source: "MYFLOWER",
                orderCode: formmatters.generateOrderCode(),
                user: { connect: { id: userId } },
                totalPrice,
                paymentStatus: "PENDING",
                orderStatus: "IN_PROCESS",
                items: {
                    create: orderItems,
                },
            },
            include: { items: true },
        });
        // await prisma.cartItem.deleteMany({ where: { userId } });
        return order;
    } catch (error: any) {
        console.log(error.message);
        throw new InternalException("Failed to create order", ErrorCode.FAILED_TO_CREATE_ORDER, error);
    }
};
export const findAllByUser = async (userId: string) => {
    return await prisma.order.findMany({
        where: { userId },
        include: { items: { include: { product: { include: { images: true } } } } },
    });
};
export const findByIdAndUser = async (userId: string, orderId: string) => {
    try {
        return await prisma.order.findFirstOrThrow({
            where: { id: orderId, userId },
            include: { items: { include: { product: { include: { images: true } } } } },
        });
    } catch (_error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};
export const cancel = async (id: string) => {
    const order = await prisma.order.findFirstOrThrow({ where: { id } });
    if (order.orderStatus !== "IN_PROCESS") {
        throw new BadRequestException("Order status cannot be canceled", ErrorCode.ORDER_NOT_IN_PROCESS);
    }

    try {
        const data = await prisma.order.update({
            where: { id },
            include: { items: { include: { product: { include: { images: true } } } } },
            data: { orderStatus: "CANCELED" },
        });
        return data;
    } catch (_error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};
export const confirm = async (id: string) => {
    const order = await prisma.order.findUniqueOrThrow({ where: { id } });
    if (order.orderStatus !== "IN_PROCESS") {
        throw new BadRequestException("Order status cannot be completed", ErrorCode.ORDER_NOT_IN_PROCESS);
    }

    try {
        const data = await prisma.order.update({
            where: { id },
            include: { items: { include: { product: { include: { images: true } } } } },
            data: { orderStatus: "COMPLETED" },
        });
        return data;
    } catch (_error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};
