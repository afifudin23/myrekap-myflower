import { ordersCustomerSchema } from "@/schemas";
import { ordersCustomerService } from "@/services";
import { Request, Response, NextFunction } from "express";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const body = ordersCustomerSchema.create.parse(req.body);
    try {
        const user = (req as any).user;
        const data = await ordersCustomerService.create(user, body);
        res.status(200).json({ message: "Order created successfully", data });
    } catch (error) {
        next(error);
    }
};
export const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const data = await ordersCustomerService.findAllByUser(userId);
        res.status(200).json({ message: data.length ? "Orders retrieved successfully" : "No orders available", data });
    } catch (error) {
        next(error);
    }
};
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id;
        const data = await ordersCustomerService.findByIdAndUser(userId, req.params.id);
        res.status(200).json({ message: "Order retrieved successfully", data });
    } catch (error) {
        next(error);
    }
};
export const cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await ordersCustomerService.cancel(req.params.id);
        res.status(200).json({ message: "Order canceled successfully", data });
    } catch (error) {
        next(error);
    }
};

export const confirmOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await ordersCustomerService.confirm(req.params.id);
        res.status(200).json({ message: "Order confirmed successfully", data });
    } catch (error) {
        next(error);
    }
};