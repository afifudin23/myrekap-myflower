import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, InternalException, NotFoundException } from "@/exceptions";
import { ordersCustomerSchema } from "@/schemas";
import { formatters } from "@/utils";

export const create = async (user: any, data: ordersCustomerSchema.CreateType) => {
    const cartItems = await prisma.cartItem.findMany({ where: { userId: user.id }, include: { product: true } });
    if (cartItems.length === 0)
        throw new BadRequestException("Cart must contain at least one item", ErrorCode.ORDER_MUST_CONTAIN_ITEMS);

    const cartItemMap = new Map(cartItems.map((cartItem) => [cartItem.productId, cartItem]));
    const orderCode = formatters.generateCode("order");
    const transactionOps = [];
    const orderItems = [];
    let totalPrice = 0;

    for (const item of data.items) {
        const cartItem = cartItemMap.get(item.productId);
        if (!cartItem) throw new NotFoundException("Product not found in cart", ErrorCode.PRODUCT_NOT_FOUND);

        if (cartItem.quantity > cartItem.product.stock)
            throw new BadRequestException("Stock is not enough", ErrorCode.STOCK_NOT_ENOUGH);

        transactionOps.push(
            prisma.product.update({
                where: { id: cartItem.productId },
                data: { stock: { decrement: cartItem.quantity } },
            }),
            prisma.productHistory.create({
                data: {
                    type: "STOCK_OUT",
                    quantity: cartItem.quantity,
                    productId: cartItem.productId,
                    note: `Order #${orderCode}`,
                },
            })
        );

        const orderItemPrice = cartItem.product.price * cartItem.quantity;
        orderItems.push({
            productId: cartItem.productId,
            quantity: cartItem.quantity,
            message: item.message,
            unitPrice: cartItem.product.price,
            totalPrice: orderItemPrice,
        });
        totalPrice += orderItemPrice;
    }
    const shippingCost = data.deliveryOption === "DELIVERY" ? totalPrice * 0.1 : 0;
    // const customerCategory = user.customerCategory ?? undefined;
    const paymentStatus = data.paymentMethod === "COD" ? "UNPAID" : undefined;
    const { items, ...orderData } = data;

    transactionOps.push(
        prisma.order.create({
            data: {
                ...orderData,
                customerName: user.fullName,
                phoneNumber: user.phoneNumber,
                source: "MYFLOWER",
                userId: user.id,
                orderCode,
                totalPrice,
                shippingCost,
                // customerCategory,
                paymentStatus,
                items: { create: orderItems },
            },
            include: { items: { include: { product: true } } },
        })
    );

    try {
        const result = await prisma.$transaction(transactionOps);
        const order = result.at(-1);

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
        orderBy: { orderDate: "desc" },
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
export const remove = async (orderCode: string) => {
    const order = await prisma.order.findFirst({ where: { orderCode }, include: { items: true } });
    if (!order) throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    const operations = [];

    for (const item of order.items) {
        operations.push(
            prisma.product.update({ where: { id: item.productId }, data: { stock: { increment: item.quantity } } })
        );

        // Hapus productHistory terakhir (terkait item ini)
        const latestHistory = await prisma.productHistory.findFirst({
            where: {
                productId: item.productId,
                note: { contains: orderCode },
            },
            orderBy: { createdAt: "desc" },
        });

        if (latestHistory) operations.push(prisma.productHistory.delete({ where: { id: latestHistory.id } }));
    }
    operations.push(prisma.order.delete({ where: { orderCode } }));

    try {
        const result = await prisma.$transaction(operations);
        return result.at(-1);
    } catch (_error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};
export const cancel = async (id: string) => {
    const order = await prisma.order.findFirst({ where: { id }, include: { items: true } });
    if (!order) throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    if (order.orderStatus !== "IN_PROCESS")
        throw new BadRequestException("Order status cannot be canceled", ErrorCode.ORDER_NOT_IN_PROCESS);

    const operations = [];

    for (const item of order.items) {
        operations.push(
            prisma.product.update({ where: { id: item.productId }, data: { stock: { increment: item.quantity } } }),
            prisma.productHistory.create({
                data: {
                    type: "STOCK_IN",
                    quantity: item.quantity,
                    productId: item.productId,
                    note: `Order #${order.orderCode} canceled by customer #${order.userId}`,
                },
            })
        );
    }

    operations.push(
        prisma.order.update({
            where: { id },
            include: { items: { include: { product: { include: { images: true } } } } },
            data: { orderStatus: "CANCELED", paymentStatus: "CANCELED" },
        })
    );

    try {
        const result = await prisma.$transaction(operations);
        return result.at(-1);
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
            data: { orderStatus: "COMPLETED", paymentStatus: "PAID" },
        });
        return data;
    } catch (_error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};

export const notification = async (order: any) => {
    // Send Notification to WhatsApp
    // const message = generatedTextLink(order);
    // enqueueWhatsAppMessage(message);
    console.log(order);
};

