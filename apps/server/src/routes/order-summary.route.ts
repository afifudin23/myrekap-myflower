import * as OrderSummaryController from "@/controllers/order-summary.controller";
import errorHandler from "@/utils/error-handler.util";
import upload from "@/utils/upload.util";
import { Router } from "express";

const orderSummaryRouter: Router = Router();

orderSummaryRouter.get("/", errorHandler(OrderSummaryController.getAllOrderSummaries));
orderSummaryRouter.get("/:id", errorHandler(OrderSummaryController.getOrderSummaryById));
orderSummaryRouter.post("/", upload.single("paymentProof"), errorHandler(OrderSummaryController.addOrderSummary));
orderSummaryRouter.post("/pdf", errorHandler(OrderSummaryController.printOrderSummary));
orderSummaryRouter.put(
    "/edit/:id",
    upload.single("paymentProof"),
    errorHandler(OrderSummaryController.updateOrderSummary)
);
orderSummaryRouter.put("/:id/order-status", errorHandler(OrderSummaryController.updateOrderStatus));

export default orderSummaryRouter;
