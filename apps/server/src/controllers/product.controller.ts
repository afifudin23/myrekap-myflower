import { Request, Response, NextFunction } from "express";
import * as productService from "@/services/product.service";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await productService.create(req.body);
        res.json({ message: "Product created successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await productService.findAll();
        res.json({ message: "Product retrieved successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await productService.findById(req.params.id);
        res.json({ message: "Product retrieved successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await productService.update(req.params.id, req.body);
        res.json({ message: "Product updated successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await productService.remove(req.params.id);
        res.json({ message: "Product deleted successfully", data });
    } catch (error) {
        return next(error);
    }
};
