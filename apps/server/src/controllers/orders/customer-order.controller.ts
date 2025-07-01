import { customerOrderService } from "@/services";
import { Request, Response, NextFunction } from "express";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "Order created successfully" });
    } catch (error) {
        next(error);
    }
};
export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const data = await customerOrderService.findAllByUser(userId);
        res.status(200).json({ message: data.length ? "Orders retrieved successfully" : "No orders available", data });
    } catch (error) {
        next(error);
    }
};
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const data = await customerOrderService.findByIdAndUser(userId, req.params.id);
        res.status(200).json({ message: "Order retrieved successfully", data });
    } catch (error) {
        next(error);
    }
};
export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await customerOrderService.cancel(req.params.id);
        res.status(200).json({ message: "Order canceled successfully", data });
    } catch (error) {
        next(error);
    }
};
