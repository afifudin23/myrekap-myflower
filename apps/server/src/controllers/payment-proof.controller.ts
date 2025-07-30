import { paymentProofService } from "@/services";
import { Request, Response, NextFunction } from "express";

export const deletePaymentProof = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await paymentProofService.deletePaymentProofByOrderSummaryId(
            req.params.orderId
        );
        res.json({ message: "Payment proof deleted successfully", data });
    } catch (error) {
        return next(error);
    }
};
