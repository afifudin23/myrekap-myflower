import { finishedProductService } from "@/services";
import { Request, Response, NextFunction } from "express";

export const addFinishedProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await finishedProductService.addFinishedProduct(req.params.orderSummaryId, req.file);
        res.json({ message: "Finished product added successfully", data });
    } catch (error) {
        return next(error);
    }
};
