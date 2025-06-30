import { paymentProofController } from "@/controllers";
import { errorHandler } from "@/utils";
import { Router } from "express";

const paymentProofRouter : Router = Router();

paymentProofRouter.delete("/:orderSummaryId", errorHandler(paymentProofController.deletePaymentProof));

export default paymentProofRouter;