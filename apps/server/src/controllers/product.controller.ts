import { Request, Response, NextFunction } from "express";
import { UnprocessableUntityException } from "@/exceptions";
import ErrorCode from "@/constants/error-code";
import { productService } from "@/services";
import { productSchema } from "@/schemas";

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
        throw new UnprocessableUntityException("Product image is required", ErrorCode.UNPROCESSABLE_ENTITY, null);
    }
    const body = productSchema.createProductSchema.parse(req.body);
    try {
        const data = await productService.create(body, files);
        res.json({ message: "Product created successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const getAllProducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await productService.findAll();
        res.json({ message: data.length ? "Products retrieved successfully" : "No products available", data });
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
    const body = productSchema.updateProductSchema.parse({
        ...req.body,
        publicIdsToDelete: req.body.publicIdsToDelete
            ? Array.isArray(req.body.publicIdsToDelete)
                ? req.body.publicIdsToDelete
                : [req.body.publicIdsToDelete]
            : [],
    });
    try {
        const data = await productService.update(req.params.id, body, req.files as Express.Multer.File[]);
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

export const manageProductStock = async (req: Request, res: Response, next: NextFunction) => {
    const body = productSchema.manageStock.parse(req.body);
    try {
        const userId = (req as any).user.id;
        const data = await productService.createStockHistory(req.params.id, userId, body);
        res.json({ message: "Product stock updated successfully", data });
    } catch (error) {
        return next(error);
    }
};

export const getMonthlyStockReport = async (req: Request, res: Response, next: NextFunction) => {
    const { month, year, type } = req.query;
    if (!month || !year || !type) {
        throw new UnprocessableUntityException(
            "Month, year and type are required",
            ErrorCode.UNPROCESSABLE_ENTITY,
            null
        );
    }
    if (!["summary", "stock_in", "stock_out"].includes(String(type))) {
        throw new UnprocessableUntityException(
            "Type must be summary, stock_in or stock_out",
            ErrorCode.UNPROCESSABLE_ENTITY,
            null
        );
    }

    try {
        const data = await productService.stockReport(
            Number(month),
            Number(year),
            String(type).toUpperCase()
        );
        res.json({ message: "Monthly stock report retrieved successfully", data });
    } catch (error) {
        return next(error);
    }
};
