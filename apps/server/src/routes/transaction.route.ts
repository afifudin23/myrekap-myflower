import { transactionController } from "@/controllers";
import { errorHandler } from "@/utils";
import { Router } from "express";

const transactionRouter: Router = Router();

transactionRouter.post("/webhook", errorHandler(transactionController.handlePaymentNotification));
transactionRouter.post("/create", errorHandler(transactionController.createTransaction));
transactionRouter.post("/cancel", errorHandler(transactionController.cancelTransaction));
transactionRouter.post("/refund", errorHandler(transactionController.refundTransaction));
transactionRouter.post("/expire", errorHandler(transactionController.expireTransaction));

export default transactionRouter;
