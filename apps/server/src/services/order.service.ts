import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";
import { BadRequestException, InternalException, NotFoundException } from "@/exceptions";
import cloudinary, { uploadFile } from "@/utils/cloudinary.util";
import { generateInvoiceNumber } from "@/utils/formatters.utils";
// import enqueueWhatsAppMessage from "@/utils/queue-wa-message.util";
import puppeteer from "puppeteer";

const orderService = {
    async getAllOrders(requestQuery: any) {
        const {
            month,
            year,
            from_date,
            to_date,
            customer_category,
            payment_method,
            payment_status,
            order_status,
        } = requestQuery;
        let orderDateFilter: { gte: Date | undefined; lte: Date | undefined };
        let orderDateOrderBy: "asc" | "desc";
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
            include: { paymentProof: true, finishedProduct: true },
        });
        return data;
    },

    async getOrderById(id: string) {
        try {
            const data = await prisma.order.findFirstOrThrow({
                where: {
                    id,
                },
            });
            return data;
        } catch (_error) {
            throw new NotFoundException("Order Summary not found", ErrorCode.ORDER_SUMMARY_NOT_FOUND);
        }
    },

    async addOrder(request: any) {
        try {
            const { paymentProof, ...requestBody } = request;
            const data = await prisma.order.create({
                data: {
                    ...requestBody,
                    invoiceNumber: generateInvoiceNumber(),
                    deliveryDate: new Date(requestBody.deliveryDate),
                    paymentStatus: requestBody.isPaid ? "LUNAS" : "BELUM_LUNAS",
                    paymentMethod: requestBody.isPaid ? requestBody.paymentMethod : "PENDING",
                },
            });

            if (paymentProof) {
                const result = await uploadFile(paymentProof, "myrekap-app/bukti-transfer");
                await prisma.paymentProof.create({
                    data: {
                        fileName: paymentProof.originalname,
                        size: paymentProof.size,
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
            throw new InternalException("Something went wrong", ErrorCode.INTERNAL_EXCEPTION, error);
        }
    },

    async updateOrder(id: string, request: any) {
        try {
            const existingOrderSummary = await prisma.order.findUnique({
                where: {
                    id,
                },
            });
            if (!existingOrderSummary)
                throw new NotFoundException("Order Summary not found", ErrorCode.ORDER_SUMMARY_NOT_FOUND);

            const { paymentProof, ...requestBody } = request;
            const data = await prisma.order.update({
                where: {
                    id,
                },
                data: {
                    ...requestBody,
                    deliveryDate: new Date(requestBody.deliveryDate),
                    paymentStatus: requestBody.isPaid ? "LUNAS" : "BELUM_LUNAS",
                    paymentMethod: requestBody.isPaid ? requestBody.paymentMethod : "PENDING",
                },
            });
            let paymentProofUpdated: any;
            if (paymentProof?.buffer) {
                const existingPaymentProof = await prisma.paymentProof.findUnique({
                    where: {
                        orderId: id,
                    },
                });
                if (existingPaymentProof) {
                    await cloudinary.uploader.destroy(existingPaymentProof?.publicId);
                    await prisma.paymentProof.delete({ where: { id: existingPaymentProof.id } });
                }
                const result = await uploadFile(paymentProof, "myrekap-app/bukti-transfer");
                paymentProofUpdated = await prisma.paymentProof.create({
                    data: {
                        fileName: paymentProof.originalname,
                        size: paymentProof.size,
                        orderId: id,
                        secureUrl: result.secure_url,
                        publicId: result.public_id,
                    },
                });
            }

            return { ...data, paymentProof: paymentProofUpdated };
        } catch (error) {
            console.log(error);
            throw new InternalException("Something went wrong", ErrorCode.INTERNAL_EXCEPTION, error);
        }
    },

    async printOrder(html: string) {
        if (!html)
            throw new BadRequestException(
                "HTML content is required for printing",
                ErrorCode.ORDER_SUMMARY_PRINT_HTML_NOT_FOUND
            );
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
            throw new InternalException("Failed to print order summary", ErrorCode.ORDER_SUMMARY_PRINT_FAILED, error);
        }
    },
    async updateOrderStatus(id: string, orderStatus: "TERKIRIM" | "IN_PROCESS" | "DIBATALKAN") {
        const orderSummaryById = await prisma.order.findUnique({ where: { id } });
        if (!orderSummaryById) {
            throw new NotFoundException("Order Summary not found", ErrorCode.ORDER_SUMMARY_NOT_FOUND);
        }

        let dataOrderStatus: any = { orderStatus };
        if (orderStatus === "DIBATALKAN") {
            dataOrderStatus = {
                orderStatus,
                paymentStatus: "BATAL",
                previousPaymentStatus: orderSummaryById.paymentStatus,
            };
        } else if (orderStatus === "TERKIRIM" || orderStatus === "IN_PROCESS") {
            if (orderSummaryById.paymentStatus === "CANCELLED" && orderSummaryById.previousPaymentStatus) {
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
            throw new NotFoundException("Order Summary not found", ErrorCode.ORDER_SUMMARY_NOT_FOUND);
        }
    },
};

export default orderService;
