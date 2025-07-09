import { transactionService } from "@/services";
import { Request, Response, NextFunction } from "express";

export const handlePaymentNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await transactionService.notification(req.body);
        res.status(200).send("OK");
    } catch (error) {
        next(error);
    }
};
export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await transactionService.create(req.body);
        res.status(200).json({ message: "Transaction created successfully", data });
    } catch (error) {
        next(error);
    }
};
export const cancelTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderCode } = req.params;
        const data = await transactionService.cancel(orderCode);
        res.status(200).json({ message: "Transaction canceled successfully", data });
    } catch (error) {
        next(error);
    }
};
export const expireTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderCode } = req.params;
        const data = await transactionService.expire(orderCode);
        res.status(200).json({ message: "Transaction expired successfully", data });
    } catch (error) {
        next(error);
    }
};
export const refundTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderCode } = req.params;
        const { amount } = req.body;
        const data = await transactionService.refund(orderCode, amount);
        res.status(200).json({ message: "Transaction refunded successfully", data });
    } catch (error) {
        next(error);
    }
};
