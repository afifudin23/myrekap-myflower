import { Request, Response, NextFunction } from "express";
import * as paymentProofService from "@/services/payment-proof.service";

export const deletePaymentProof = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await paymentProofService.deletePaymentProofByOrderSummaryId(
            req.params.orderSummaryId
        );
        res.json({ message: "Payment proof deleted successfully", data });
    } catch (error) {
        return next(error);
    }
};
