import ErrorCode from "@/constants/error-code";
import { BadRequestException, InternalException, NotFoundException } from "@/exceptions";
import { cloudinary, prisma, uploadFile } from "@/config";
import { formatters } from "@/utils";
import { mailerService } from "@/services";

export const getAllOrders = async (query: any) => {
    const { month, year, from_date, to_date, customer_category, payment_method, payment_status, order_status } = query;
    let orderDateFilter: { gte: Date | undefined; lte: Date | undefined };
    let orderDateOrderBy: "asc" | "desc" = "desc";
    if (month && year) {
        const startDate = new Date(year, month - 1, 1); // 1st day, 00:00:00
        const endDate = new Date(year, month, 0); // Last day, 23:59:59

        orderDateFilter = {
            gte: startDate,
            lte: endDate,
        };
        orderDateOrderBy = "desc";
    } else if (from_date && to_date) {
        orderDateFilter = {
            gte: new Date(from_date),
            lte: new Date(to_date),
        };
        orderDateOrderBy = "asc";
    } else {
        orderDateFilter = {
            gte: undefined,
            lte: undefined,
        };
    }
    const data = await prisma.order.findMany({
        where: {
            orderDate: orderDateFilter,
            customerCategory: customer_category?.toLowerCase() !== "all" ? customer_category?.toUpperCase() : undefined,
            paymentMethod: payment_method?.toLowerCase() !== "all" ? payment_method?.toUpperCase() : undefined,
            paymentStatus: payment_status?.toLowerCase() !== "all" ? payment_status?.toUpperCase() : undefined,
            orderStatus: order_status?.toLowerCase() !== "all" ? order_status?.toUpperCase() : undefined,
        },
        orderBy: {
            orderDate: orderDateOrderBy,
        },
        include: {
            items: { include: { product: { include: { images: true } } } },
            paymentProof: true,
            finishedProduct: true,
        },
    });
    return data;
};

export const getOrderById = async (id: string) => {
    try {
        const data = await prisma.order.findFirstOrThrow({
            where: {
                id,
            },
        });
        return data;
    } catch (_error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};

export const create = async (userId: string, body: any, file: Express.Multer.File) => {
    const products = await prisma.product.findMany();
    const productMap = new Map(products.map((product) => [product.id, product]));
    const orderItems = [];
    const stockOperations = [];
    const orderCode = formatters.generateCode("order");

    for (const item of body.items) {
        const product = productMap.get(item.productId);
        if (!product) throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);

        // Check if stock is enough
        if (item.quantity >= product.stock)
            throw new BadRequestException("Stock is not enough", ErrorCode.STOCK_NOT_ENOUGH);

        // Save stock operation update stock and create stock history
        stockOperations.push(
            prisma.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } },
            }),
            prisma.productHistory.create({
                data: {
                    type: "STOCK_OUT",
                    quantity: item.quantity,
                    productId: item.productId,
                    note: `Order #${orderCode}`,
                },
            })
        );

        // Save order item
        orderItems.push({
            productId: item.productId,
            quantity: item.quantity,
            message: item.message,
            unitPrice: product?.price,
            totalPrice: product.price * item.quantity,
        });
    }

    const totalPrice = orderItems.reduce((total: number, item: any) => total + item.totalPrice, 0);
    const shippingCost = body.deliveryOption === "DELIVERY" ? totalPrice * 0.1 : 0;

    const createOrder = prisma.order.create({
        data: {
            ...body,
            orderCode,
            source: "MYREKAP",
            userId,
            totalPrice,
            shippingCost,
            paymentStatus: "PAID",
            items: { create: orderItems },
        },
        include: { items: { include: { product: true } } },
    });

    try {
        const [_, __, order] = await prisma.$transaction([...stockOperations, createOrder]);

        if (file && body.paymentMethod === "BANK_TRANSFER") {
            const result = await uploadFile(file, "myflower-myrekap/bukti-transfer");
            await prisma.paymentProof.create({
                data: {
                    fileName: file.originalname,
                    size: file.size,
                    orderId: order.id,
                    secureUrl: result.secure_url,
                    publicId: result.public_id,
                },
            });
        }
        // Send Notification to WhatsApp
        // const message = generatedTextLink(order);
        // enqueueWhatsAppMessage(message);

        return order;
    } catch (error) {
        console.log(error);
        throw new InternalException("Something went wrong", ErrorCode.INTERNAL_EXCEPTION, error);
    }
};

export const update = async (id: string, body: any, file: Express.Multer.File) => {
    // Check if order exists
    const existingOrder = await prisma.order.findUnique({ where: { id }, include: { items: true } });
    if (!existingOrder) throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);

    // Check if orderItem wants to be updated
    const incomingItems = body.items;
    const transactionOps: any[] = [];

    if (incomingItems) {
        const products = await prisma.product.findMany();
        const productMap = new Map(products.map((product) => [product.id, product]));

        // Map existing items by ID for quick lookup
        const existingItemMap = new Map(existingOrder.items.map((item) => [item.id, item]));

        // List of existing item IDs from the database
        const existingItemIds = existingOrder.items.map((item) => item.id);

        // Will store IDs of incoming items that still exist (not deleted)
        const incomingItemIds: string[] = [];

        // UPDATE OR CREATE ORDER ITEM
        for (const item of incomingItems) {
            const product = productMap.get(item.productId);
            if (!product) throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);

            const baseData = {
                quantity: item.quantity,
                message: item.message,
                unitPrice: product.price,
                totalPrice: product.price * item.quantity,
                productId: item.productId,
                orderId: id,
            };

            // UPDATE EXISTING ITEM
            if (item.id) {
                const existingItem = existingItemMap.get(item.id);
                if (!existingItem) throw new NotFoundException("Order item not found", ErrorCode.ORDER_ITEM_NOT_FOUND);
                const qtyDifference = item.quantity - existingItem.quantity;
                if (qtyDifference > product.stock)
                    throw new BadRequestException("Stock is not enough", ErrorCode.STOCK_NOT_ENOUGH);

                // 1. If qty difference is negative, increase product stock and create a STOCK_IN history
                // 2. If qty difference is positive, decrease product stock and create a STOCK_OUT history
                // 3. If qty difference is 0, do nothing

                // CHECK IF STOCK UPDATES
                if (qtyDifference !== 0) {
                    transactionOps.push(
                        prisma.product.update({
                            where: { id: item.productId },
                            data: { stock: { decrement: qtyDifference } },
                        }),
                        prisma.productHistory.create({
                            data: {
                                type: qtyDifference < 0 ? "STOCK_IN" : "STOCK_OUT",
                                quantity: Math.abs(qtyDifference),
                                productId: item.productId,
                                note: `Update Order #${existingOrder.orderCode}`,
                            },
                        })
                    );
                }

                transactionOps.push(prisma.orderItem.update({ where: { id: item.id }, data: baseData }));
                incomingItemIds.push(item.id);
            } else {
                // CREATE NEW ITEM
                if (item.quantity > product.stock)
                    throw new BadRequestException("Stock is not enough", ErrorCode.STOCK_NOT_ENOUGH);

                transactionOps.push(
                    prisma.orderItem.create({ data: baseData }),
                    prisma.product.update({
                        where: { id: item.productId },
                        data: { stock: { decrement: item.quantity } },
                    }),
                    prisma.productHistory.create({
                        data: {
                            type: "STOCK_OUT",
                            quantity: item.quantity,
                            productId: item.productId,
                            note: `Create Order #${existingOrder.orderCode}`,
                        },
                    })
                );
            }
        }

        // DELETE ORDER ITEM
        const itemsToDelete = existingItemIds.filter((id) => !incomingItemIds.includes(id));
        if (itemsToDelete.length > 0) {
            const deleteItems = existingOrder.items.filter((item) => itemsToDelete.includes(item.id));

            for (const item of deleteItems) {
                transactionOps.push(
                    prisma.product.update({
                        where: { id: item.productId },
                        data: { stock: { increment: item.quantity } },
                    }),
                    prisma.productHistory.create({
                        data: {
                            type: "STOCK_IN",
                            quantity: item.quantity,
                            productId: item.productId,
                            note: `Delete Order #${existingOrder.orderCode}`,
                        },
                    }),
                    prisma.orderItem.deleteMany({ where: { id: item.id } })
                );
            }
        }
    }

    // DELETE PAYMENT PROOF
    if (body.publicIdsToDelete) {
        await Promise.all(
            body.publicIdsToDelete.map(async (publicId: string) => {
                await cloudinary.uploader.destroy(publicId).catch((error) => {
                    console.error("❌ Failed to delete image:", publicId, error);
                });
            })
        );
        await prisma.paymentProof.deleteMany({ where: { publicId: { in: body.publicIdsToDelete } } });
    }

    // UPLOAD FILE IF EXISTS
    if (file?.buffer) {
        const existingProof = await prisma.paymentProof.findUnique({
            where: { orderId: id },
        });

        if (existingProof) {
            await cloudinary.uploader.destroy(existingProof.publicId);
            await prisma.paymentProof.delete({ where: { id: existingProof.id } });
        }

        const result = await uploadFile(file, "myflower-myrekap/bukti-transfer");

        await prisma.paymentProof.create({
            data: {
                fileName: file.originalname,
                size: file.size,
                orderId: id,
                secureUrl: result.secure_url,
                publicId: result.public_id,
            },
        });
    }

    // UPDATE ORDER (EXCLUDE ORDER ITEM)
    const total = await prisma.orderItem.aggregate({
        where: { orderId: id },
        _sum: {
            totalPrice: true,
        },
    });
    const totalPrice = total._sum.totalPrice ?? 0;
    const shippingCost = body.deliveryOption === "DELIVERY" ? totalPrice * 0.1 : 0;

    const { items, publicIdsToDelete, ...data } = body;
    transactionOps.push(
        prisma.order.update({
            where: { id },
            data: { ...data, totalPrice, shippingCost },
            include: { items: { include: { product: true } } },
        })
    );
    try {
        const result = await prisma.$transaction(transactionOps);

        return result.at(-1);
    } catch (error) {
        console.log(error);
        throw new InternalException("Something went wrong", ErrorCode.INTERNAL_EXCEPTION, error);
    }
};

export const updateProgress = async (
    orderId: string,
    userId: string,
    orderStatus: "COMPLETED" | "DELIVERY" | "IN_PROCESS" | "CANCELED",
    finishedProduct?: Express.Multer.File
) => {
    // Check if finished product exists
    if (finishedProduct) {
        // Delete existing finished product
        const existingFinishedProduct = await prisma.finishedProduct.findUnique({ where: { orderId } });
        if (existingFinishedProduct) {
            await prisma.finishedProduct.delete({ where: { orderId } });
            await cloudinary.uploader.destroy(existingFinishedProduct.publicId);
        }

        // Upload new finished product
        const result = await uploadFile(finishedProduct, "myflower-myrekap/produk-selesai");
        await prisma.finishedProduct.create({
            data: {
                fileName: finishedProduct.originalname,
                size: finishedProduct.size,
                orderId,
                secureUrl: result.secure_url,
                publicId: result.public_id,
            },
        });
    }

    // Check if order exists
    const order = await prisma.order.findUnique({ where: { id: orderId }, include: { items: true } });
    if (!order) throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);

    // Update order status
    let dataOrderStatus: any = { orderStatus };
    const stockOperations = [];

    if (orderStatus === "CANCELED") {
        dataOrderStatus = {
            orderStatus,
            paymentStatus: "CANCELED",
            previousPaymentStatus: order.paymentStatus,
        };

        // Create STOCK_IN history for cancellation
        for (const item of order.items) {
            stockOperations.push(
                prisma.product.update({
                    where: { id: item.productId },
                    data: { stock: { increment: item.quantity } },
                }),
                prisma.productHistory.create({
                    data: {
                        type: "STOCK_IN",
                        quantity: item.quantity,
                        productId: item.productId,
                        note: `Order #${order.orderCode} canceled by admin #${userId}`,
                    },
                })
            );
        }
    } else if (
        ["COMPLETED", "IN_PROCESS", "DELIVERY"].includes(orderStatus) &&
        order.paymentStatus === "CANCELED" &&
        order.previousPaymentStatus
    ) {
        dataOrderStatus = {
            orderStatus,
            paymentStatus: order.previousPaymentStatus,
            previousPaymentStatus: null,
        };

        // Create STOCK_OUT history for reactivation
        for (const item of order.items) {
            stockOperations.push(
                prisma.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } },
                }),
                prisma.productHistory.create({
                    data: {
                        type: "STOCK_OUT",
                        quantity: item.quantity,
                        productId: item.productId,
                        note: `Order #${order.orderCode} reactivated by admin #${userId}`,
                    },
                })
            );
        }
    }

    // Update order
    try {
        if (stockOperations.length > 0) await prisma.$transaction(stockOperations);

        const orderUpdated = await prisma.order.update({
            where: { id: orderId },
            data: dataOrderStatus,
            include: {
                user: true,
                items: { include: { product: { include: { images: true } } } },
                finishedProduct: true,
            },
        });
        if (order.source === "MYFLOWER") mailerService.sendUpdateOrderStatusEmail(orderUpdated);
        return orderUpdated;
    } catch (_error) {
        throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    }
};
