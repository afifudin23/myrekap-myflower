import midtransClient from "midtrans-client";
import crypto from "crypto";
import { formatters } from "@/utils";
import { InternalException, MidtransException, NotFoundException } from "@/exceptions";
import ErrorCode from "@/constants/error-code";
import prisma from "@/config/database";

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const core = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export const notification = async (data: any) => {
    try {
        const { order_id, status_code, gross_amount, signature_key } = data;
        const signatureHash = crypto
            .createHash("sha512")
            .update(order_id + status_code + gross_amount + process.env.MIDTRANS_SERVER_KEY)
            .digest("hex");

        if (signatureHash !== signature_key) {
            throw new Error("Invalid signature key");
        }

        const notification = await snap.transaction.notification(data);
        const transactionStatus = notification.transaction_status;
        const orderCode = notification.metadata.order_id || order_id;

        const order = await prisma.order.findUnique({ where: { orderCode: orderCode } });
        if (!order) {
            console.log("Order not found");
            return;
        }

        switch (transactionStatus) {
            case "capture":
            case "settlement": {
                const { paymentMethod, paymentProvider } = formatters.generatePaymentInfo(notification);
                await prisma.order.update({
                    where: { orderCode: orderCode },
                    data: {
                        paymentStatus: "PAID",
                        paymentMethod: paymentMethod,
                        paymentProvider: paymentProvider,
                    },
                });
                break;
            }
            case "cancel": {
                await prisma.order.update({
                    where: { orderCode: orderCode },
                    data: {
                        paymentStatus: "CANCELED",
                    },
                });
                break;
            }
            case "deny": {
                await prisma.order.update({
                    where: { orderCode: orderCode },
                    data: {
                        paymentStatus: "DENIED",
                    },
                });
                break;
            }
            case "expire": {
                await prisma.order.update({
                    where: { orderCode: orderCode },
                    data: {
                        paymentStatus: "EXPIRED",
                    },
                });
                break;
            }
            case "refund": {
                await prisma.order.update({
                    where: { orderCode: orderCode },
                    data: {
                        paymentStatus: "REFUNDED",
                    },
                });
                break;
            }
        }
    } catch (error: any) {
        console.log(error.message);
    }
};
export const create = async (user: any, orderCode: string) => {
    const order = await prisma.order.findFirst({
        where: { orderCode, userId: user.id },
        include: { items: { include: { product: { select: { name: true } } } } },
    });
    if (!order) throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
    try {
        const parameter = {
            transaction_details: {
                order_id: orderCode,
                gross_amount: order.totalPrice + order.shippingCost,
            },
            credit_card: {
                secure: true,
            },
            metadata: {
                order_id: orderCode,
            },
            customer_details: {
                first_name: order.customerName,
                email: user.email, // Isi sesuai data
            },
            item_details: [
                ...formatters.generateItemDetails(order.items),
                {
                    id: "ONGKIR",
                    name: "Biaya Pengiriman",
                    price: order.shippingCost,
                    quantity: 1,
                },
            ],
            enabled_payments: [
                "qris",
                "bank_transfer",
                "credit_card",
                "gopay",
                "shopeepay",
                "dana",
                "linkaja",
                "indomaret",
                "alfamart",
            ],
        };

        return await snap.createTransaction(parameter);
    } catch (error: any) {
        console.log(error);
        let errorParsed;
        const match = error.message.match(/API response:\s*(\{.*\})/i);
        if (match) {
            errorParsed = JSON.parse(match[1]);
            throw new MidtransException(
                errorParsed.error_messages[0] || "Create transaction failed",
                Number(error.httpStatusCode),
                ErrorCode.MIDTRANS_CREATE_TRANSACTION_ERROR
            );
        } else {
            errorParsed = {
                status_code: "500",
                status_message: error.message || "Unknown error",
            };
            throw new InternalException(errorParsed.status_message, ErrorCode.INTERNAL_EXCEPTION, errorParsed);
        }
    }
};

export const cancel = async (orderCode: string) => {
    try {
        return await core.transaction.cancel(orderCode);
    } catch (error: any) {
        let errorParsed;
        const match = error.message.match(/API response:\s*(\{.*\})/i);
        if (match) {
            errorParsed = JSON.parse(match[1]);
            throw new MidtransException(
                errorParsed.status_message || "Cancel transaction failed",
                Number(errorParsed.status_code),
                ErrorCode.MIDTRANS_CANCEL_TRANSACTION_ERROR
            );
        } else {
            errorParsed = {
                status_code: "500",
                status_message: error.message || "Unknown error",
            };
            throw new InternalException(errorParsed.status_message, ErrorCode.INTERNAL_EXCEPTION, errorParsed);
        }
    }
};

export const expire = async (orderCode: string) => {
    try {
        return await core.transaction.expire(orderCode);
    } catch (error: any) {
        let errorParsed;
        const match = error.message.match(/API response:\s*(\{.*\})/i);
        if (match) {
            errorParsed = JSON.parse(match[1]);
            throw new MidtransException(
                errorParsed.status_message || "Expire transaction failed",
                Number(errorParsed.status_code),
                ErrorCode.MIDTRANS_EXPIRE_TRANSACTION_ERROR
            );
        } else {
            errorParsed = {
                status_code: "500",
                status_message: error.message || "Unknown error",
            };
            throw new InternalException(errorParsed.status_message, ErrorCode.INTERNAL_EXCEPTION, errorParsed);
        }
    }
};
export const refund = async (orderCode: string, amount: number) => {
    try {
        return await core.transaction.refund(orderCode, amount);
    } catch (error: any) {
        let errorParsed;
        const match = error.message.match(/API response:\s*(\{.*\})/i);
        if (match) {
            errorParsed = JSON.parse(match[1]);
            throw new MidtransException(
                errorParsed.status_message || "Refund transaction failed",
                Number(errorParsed.status_code),
                ErrorCode.MIDTRANS_REFUND_TRANSACTION_ERROR
            );
        } else {
            errorParsed = {
                status_code: "500",
                status_message: error.message || "Unknown error",
            };
            throw new InternalException(errorParsed.status_message, ErrorCode.INTERNAL_EXCEPTION, errorParsed);
        }
    }
};
