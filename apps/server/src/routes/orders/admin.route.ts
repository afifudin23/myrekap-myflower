import { ordersAdminController } from "@/controllers";
import { errorHandler, upload } from "@/utils";
import { Router } from "express";

const ordersAdminRouter: Router = Router();

ordersAdminRouter.get("/", errorHandler(ordersAdminController.getAllOrders));
ordersAdminRouter.get("/:id", errorHandler(ordersAdminController.getOrderById));
ordersAdminRouter.post("/", upload.single("paymentProof"), errorHandler(ordersAdminController.addOrder));
ordersAdminRouter.post("/pdf", errorHandler(ordersAdminController.printOrder));
ordersAdminRouter.put("/edit/:id", upload.single("paymentProof"), errorHandler(ordersAdminController.updateOrder));
ordersAdminRouter.put("/:id/order-status", errorHandler(ordersAdminController.updateOrderStatus));

export default ordersAdminRouter;
