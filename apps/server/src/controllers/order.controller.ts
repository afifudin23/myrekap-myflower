import { orderSchema } from "@/schemas";
import { orderService } from "@/services";
import { Request, Response, NextFunction } from "express";

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await orderService.getAllOrders(req.query);
        res.json({ message: data.length ? "Orders retrieved successfully" : "No orders available", data });
    } catch (error) {
        return next(error);
    }
};
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await orderService.getOrderById(req.params.id);
        res.json({ message: "Order retrieved successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const addOrder = async (req: Request, res: Response, next: NextFunction) => {
    const request = orderSchema.createOrderSchema.parse({ ...req.body, paymentProof: req.file });
    try {
        const data = await orderService.addOrder(request);
        res.json({ message: "Order created successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    let paymentProof: any;
    if (req.file) {
        paymentProof = req.file;
    } else if (req.body.paymentProof) {
        paymentProof = JSON.parse(req.body.paymentProof);
    } else {
        paymentProof = null;
    }

    const request = orderSchema.updateOrderSchema.parse({ ...req.body, paymentProof });
    try {
        const data = await orderService.updateOrder(req.params.id, request);
        res.json({ message: "Order updated successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const printOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { html } = req.body;

    try {
        const data = await orderService.printOrder(html);
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
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await orderService.updateOrderStatus(req.params.id, req.body.orderStatus);
        res.json({ message: "Order canceled successfully", data });
    } catch (error) {
        return next(error);
    }
};
