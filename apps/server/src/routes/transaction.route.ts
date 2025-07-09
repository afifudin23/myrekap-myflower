import { transactionController } from "@/controllers";
import { errorHandler } from "@/utils";
import { Router } from "express";

const transactionRouter: Router = Router();

transactionRouter.post("/webhook", errorHandler(transactionController.handlePaymentNotification));
transactionRouter.post("/create", errorHandler(transactionController.createTransaction));
transactionRouter.post("/:orderCode/cancel", errorHandler(transactionController.cancelTransaction));
transactionRouter.post("/:orderCode/refund", errorHandler(transactionController.refundTransaction));
transactionRouter.post("/:orderCode/expire", errorHandler(transactionController.expireTransaction));

export default transactionRouter;
