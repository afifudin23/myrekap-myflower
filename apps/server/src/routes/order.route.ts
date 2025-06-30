import { orderController } from "@/controllers";
import { errorHandler, upload } from "@/utils";
import { Router } from "express";

const orderRouter: Router = Router();

orderRouter.get("/", errorHandler(orderController.getAllOrders));
orderRouter.get("/:id", errorHandler(orderController.getOrderById));
orderRouter.post("/", upload.single("paymentProof"), errorHandler(orderController.addOrder));
orderRouter.post("/pdf", errorHandler(orderController.printOrder));
orderRouter.put("/edit/:id", upload.single("paymentProof"), errorHandler(orderController.updateOrder));
orderRouter.put("/:id/order-status", errorHandler(orderController.updateOrderStatus));

export default orderRouter;
