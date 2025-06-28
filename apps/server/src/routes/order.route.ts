import * as OrderController from "@/controllers/order.controller";
import errorHandler from "@/utils/error-handler.util";
import { uploadSingle } from "@/utils/upload.util";
import { Router } from "express";

const orderRouter: Router = Router();

orderRouter.get("/", errorHandler(OrderController.getAllOrders));
orderRouter.get("/:id", errorHandler(OrderController.getOrderById));
orderRouter.post("/", uploadSingle("paymentProof"), errorHandler(OrderController.addOrder));
orderRouter.post("/pdf", errorHandler(OrderController.printOrder));
orderRouter.put("/edit/:id", uploadSingle("paymentProof"), errorHandler(OrderController.updateOrder));
orderRouter.put("/:id/order-status", errorHandler(OrderController.updateOrderStatus));

export default orderRouter;
