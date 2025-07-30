import ErrorCode from "@/constants/error-code";
import { UnprocessableUntityException } from "@/exceptions";
import { AuthReq } from "@/middlewares/auth.middleware";
import { ordersAdminSchema } from "@/schemas";
import { ordersAdminService } from "@/services";
import { Request, Response, NextFunction } from "express";

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await ordersAdminService.getAllOrders(req.query);
        res.json({ message: data.length ? "Orders retrieved successfully" : "No orders available", data });
    } catch (error) {
        return next(error);
    }
};
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await ordersAdminService.getOrderById(req.params.id);
        res.json({ message: "Order retrieved successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as Express.Multer.File;
    const body = ordersAdminSchema.create.parse(req.body);
    if (body.paymentMethod === "BANK_TRANSFER" && !file) {
        throw new UnprocessableUntityException(
            "Payment proof is required for bank transfer",
            ErrorCode.UNPROCESSABLE_ENTITY,
            null
        );
    }
    try {
        const userId = (req as AuthReq).user.id;
        const data = await ordersAdminService.create(userId, body, file);
        res.json({ message: "Order created successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as Express.Multer.File;
    const body = ordersAdminSchema.update.parse(req.body);
    try {
        const data = await ordersAdminService.update(req.params.id, body, file);
        res.json({ message: "Order updated successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const printOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { html } = req.body;
    try {
        const data = await ordersAdminService.printOrder(html);
        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="Laporan_Penjualan_${
                new Date().toISOString().split("T")[0]
            }.pdf"`,
            "Content-Length": data.length.toString(),
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        });
        res.send(Buffer.from(data));
    } catch (error) {
        return next(error);
    }
};
export const updateOrderProgress = async (req: Request, res: Response, next: NextFunction) => {
    const {orderStatus} = ordersAdminSchema.updateOrderStatus.parse(req.body);
    try {
        const data = await ordersAdminService.updateProgress(req.params.id, orderStatus, req.file);
        res.json({ message: "Update order status successfully", data });
    } catch (error) {
        return next(error);
    }
};

