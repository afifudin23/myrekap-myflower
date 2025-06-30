import { AuthReq } from "@/middlewares/auth.middleware";
import { cartItemService } from "@/services";
import { Request, Response, NextFunction } from "express";

export const getUserCartItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthReq).user.id;
        const data = await cartItemService.findAll(userId);
        res.json({ message: "Cart items retrieved successfully", data });
    } catch (error) {
        return next(error);
    }
};
export const upsertCartItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthReq).user.id;
        const data = await cartItemService.upsert(userId, req.body);
        res.json({ message: "Cart item updated successfully", data });
    } catch (error) {
        return next(error);
    }
};
export const removeCartItem = async (req: Request, res: Response, next: NextFunction) => {};
export const clearCartItems = async (req: Request, res: Response, next: NextFunction) => {};
