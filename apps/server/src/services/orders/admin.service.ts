import ErrorCode from "@/constants/error-code";
import { BadRequestException, InternalException, NotFoundException } from "@/exceptions";
import { cloudinary, prisma, uploadFile } from "@/config";
// import enqueueWhatsAppMessage from "@/utils/queue-wa-message.util";
import puppeteer from "puppeteer";
import { generateOrderCode } from "@/utils/formatters.utils";

export const getAllOrders = async (requestQuery: any) => {
    const { month, year, from_date, to_date, customer_category, payment_method, payment_status, order_status } =
        requestQuery;
    let orderDateFilter: { gte: Date | undefined; lte: Date | undefined };
    let orderDateOrderBy: "asc" | "desc" = "desc";
    if (month && year) {
        const startDate = new Date(year, month - 1, 1, 0, 0, 0); // 1st day, 00:00:00
        const lastDay = new Date(year, month, 0).getDate(); // e.g. 28/30/31
        const endDate = new Date(year, month - 1, lastDay, 23, 59, 59); // Last day, 23:59:59

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
            // flowerCategory: flower_category?.toLowerCase() !== "semua" ? flower_category?.toUpperCase() : undefined,
            customerCategory:
                customer_category?.toLowerCase() !== "semua" ? customer_category?.toUpperCase() : undefined,
            paymentMethod: payment_method?.toLowerCase() !== "semua" ? payment_method?.toUpperCase() : undefined,
            paymentStatus: payment_status?.toLowerCase() !== "semua" ? payment_status?.toUpperCase() : undefined,
            orderStatus: order_status?.toLowerCase() !== "semua" ? order_status?.toUpperCase() : undefined,
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
    const orderItems = body.items.map((item: any) => {
        const product = products.find((product) => product.id === item.productId);
        if (!product) throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
        return {
            product: { connect: { id: item.productId } },
            quantity: item.quantity,
            message: item.message,
            unitPrice: product?.price,
            totalPrice: product.price * item.quantity,
        };
    });
    try {
        const totalPrice = orderItems.reduce((total: number, item: any) => total + item.totalPrice, 0);
        const shippingCost = totalPrice * 0.1;
        const data = await prisma.order.create({
            data: {
                ...body,
                orderCode: generateOrderCode(),
                source: "MYREKAP",
                userId,
                totalPrice,
                ...(["CASH", "BANK_TRANSFER"].includes(body.paymentMethod) && { paymentStatus: "PAID" }),
                ...(body.deliveryOption === "DELIVERY" && { shippingCost }),
                items: { create: orderItems },
            },
        });

        if (file && body.paymentMethod === "BANK_TRANSFER") {
            const result = await uploadFile(file, "myflower-myrekap/bukti-transfer");
            await prisma.paymentProof.create({
                data: {
                    fileName: file.originalname,
                    size: file.size,
                    orderId: data.id,
                    secureUrl: result.secure_url,
                    publicId: result.public_id,
                },
            });
        }
        // const message = generatedTextLink(
        //     data.customerName,
        //     data.flowerCategory,
        //     (data.price + data.shippingCost) * data.quantity,
        //     data.deliveryAddress,
        //     data.deliveryDate.toISOString()
        // );
        // enqueueWhatsAppMessage(message);
        return data;
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
    try {
        const incomingItems = body.items;
        if (incomingItems) {
            const products = await prisma.product.findMany();

            const existingItemIds = existingOrder.items.map((item) => item.id);
            const incomingItemIds: string[] = [];

            // UPDATE OR CREATE
            for (const item of incomingItems) {
                const product = products.find((p) => p.id === item.productId);
                if (!product) {
                    throw new NotFoundException("Product not found", ErrorCode.PRODUCT_NOT_FOUND);
                }

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
                    await prisma.orderItem.update({
                        where: { id: item.id },
                        data: baseData,
                    });
                    incomingItemIds.push(item.id);
                } else {
                    // CREATE NEW ITEM
                    const created = await prisma.orderItem.create({ data: baseData });
                    incomingItemIds.push(created.id);
                }
            }

            // DELETE ORDER ITEM
            const itemsToDelete = existingItemIds.filter((id) => !incomingItemIds.includes(id));
            if (itemsToDelete.length > 0) {
                await prisma.orderItem.deleteMany({
                    where: { id: { in: itemsToDelete } },
                });
            }
        }
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

            const result = await uploadFile(file, "myrekap-app/bukti-transfer");

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
        const { items, publicIdsToDelete, ...data } = body;
        const updatedOrder = await prisma.order.update({
            where: { id },
            data,
            include: { items: { include: { product: true } } },
        });

        return updatedOrder;
    } catch (error) {
        console.log(error);
        throw new InternalException("Something went wrong", ErrorCode.INTERNAL_EXCEPTION, error);
    }
};

export const printOrder = async (html: string) => {
    if (!html)
        throw new BadRequestException("HTML content is required for printing", ErrorCode.ORDER_PRINT_HTML_NOT_FOUND);
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: "networkidle0" });
        await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            landscape: true,
            margin: {
                top: "20px",
                right: "20px",
                bottom: "20px",
                left: "20px",
            },
        });
        await browser.close();

        return pdfBuffer;
    } catch (error) {
        console.log(error);
        throw new InternalException("Failed to print order summary", ErrorCode.ORDER_PRINT_FAILED, error);
    }
};

export const updateOrderStatus = async (id: string, orderStatus: "TERKIRIM" | "IN_PROCESS" | "DIBATALKAN") => {
    const orderSummaryById = await prisma.order.findUnique({ where: { id } });
    if (!orderSummaryById) {
        throw new NotFoundException("Order Summary not found", ErrorCode.ORDER_NOT_FOUND);
    }

    let dataOrderStatus: any = { orderStatus };
    if (orderStatus === "DIBATALKAN") {
        dataOrderStatus = {
            orderStatus,
            paymentStatus: "BATAL",
            previousPaymentStatus: orderSummaryById.paymentStatus,
        };
    } else if (orderStatus === "TERKIRIM" || orderStatus === "IN_PROCESS") {
        if (orderSummaryById.paymentStatus === "CANCELED" && orderSummaryById.previousPaymentStatus) {
            dataOrderStatus = {
                orderStatus,
                paymentStatus: orderSummaryById.previousPaymentStatus,
                previousPaymentStatus: null,
            };
        }
    }
    try {
        const data = await prisma.order.update({
            where: { id },
            data: dataOrderStatus,
        });
        return data;
    } catch (_error) {
        throw new NotFoundException("Order Summary not found", ErrorCode.ORDER_NOT_FOUND);
    }
};
