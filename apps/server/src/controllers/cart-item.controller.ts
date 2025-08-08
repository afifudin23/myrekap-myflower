import { AuthReq } from "../middlewares/auth.middleware";
import { cartItemSchema } from "../schemas";
import { cartItemService } from "../services";
import { Request, Response, NextFunction } from "express";

export const getUserCartItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthReq).user.id;
        const data = await cartItemService.findAll(userId);
        res.json({ message: data.length ? "Cart items retrieved successfully" : "No cart items available", data });
    } catch (error) {
        return next(error);
    }
};
export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
    const body = cartItemSchema.addToCartSchema.parse(req.body);
    try {
        const userId = (req as AuthReq).user.id;
        const { data, isNew } = await cartItemService.upsertItem(userId, body);
        res.json({
            message: isNew ? "Item added to cart successfully" : "Cart item updated successfully",
            data,
        });
    } catch (error) {
        return next(error);
    }
};

export const incrementCartItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthReq).user.id;
        const data = await cartItemService.incrementItem(userId, req.params.productId);
        res.json({ message: "Cart item incremented successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const decrementCartItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthReq).user.id;
        const { data, updated } = await cartItemService.decrementItem(userId, req.params.productId);
        res.json({ message: updated ? "Cart item decremented successfully" : "Cart item deleted successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const deleteCartItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthReq).user.id;
        const data = await cartItemService.removeItem(userId, req.params.productId);
        res.json({ message: "Cart item deleted successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const clearCartItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as AuthReq).user.id;
        const data = await cartItemService.removeAll(userId);
        res.json({ message: "Cart cleared successfully", data });
    } catch (error) {
        return next(error);
    }
};
