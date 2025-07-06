import { Request, Response, NextFunction } from "express";

export const handlePaymentNotification = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "Payment notification received successfully" });
    } catch (error) {
        next(error);
    }
};
export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "Transaction created successfully" });
    } catch (error) {
        next(error);
    }
};
export const cancelTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "Transaction canceled successfully" });
    } catch (error) {
        next(error);
    }
};
export const expireTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "Transaction expired successfully" });
    } catch (error) {
        next(error);
    }
};
export const refundTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ message: "Transaction refunded successfully" });
    } catch (error) {
        next(error);
    }
};

