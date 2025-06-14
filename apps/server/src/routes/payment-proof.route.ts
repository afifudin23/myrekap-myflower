import errorHandler from "@/utils/error-handler.util";
import { Router } from "express";
import * as paymentProofController from "@/controllers/payment-proof.controller";

const paymentProofRouter : Router = Router();

paymentProofRouter.delete("/:orderSummaryId", errorHandler(paymentProofController.deletePaymentProof));

export default paymentProofRouter;