import { transactionController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { errorHandler } from "@/utils";
import { Router } from "express";

const transactionRouter: Router = Router();

transactionRouter.post("/webhook", errorHandler(transactionController.handlePaymentNotification));
transactionRouter.post("/create", [authMiddleware], errorHandler(transactionController.createTransaction));
transactionRouter.post("/:orderCode/cancel", [authMiddleware], errorHandler(transactionController.cancelTransaction));
transactionRouter.post("/:orderCode/refund", [authMiddleware], errorHandler(transactionController.refundTransaction));
transactionRouter.post("/:orderCode/expire", [authMiddleware], errorHandler(transactionController.expireTransaction));

export default transactionRouter;
