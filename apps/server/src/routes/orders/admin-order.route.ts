import { adminOrderController } from "@/controllers";
import { errorHandler, upload } from "@/utils";
import { Router } from "express";

const adminOrderRouter: Router = Router();

adminOrderRouter.get("/", errorHandler(adminOrderController.getAllOrders));
adminOrderRouter.get("/:id", errorHandler(adminOrderController.getOrderById));
adminOrderRouter.post("/", upload.single("paymentProof"), errorHandler(adminOrderController.addOrder));
adminOrderRouter.post("/pdf", errorHandler(adminOrderController.printOrder));
adminOrderRouter.put("/edit/:id", upload.single("paymentProof"), errorHandler(adminOrderController.updateOrder));
adminOrderRouter.put("/:id/order-status", errorHandler(adminOrderController.updateOrderStatus));

export default adminOrderRouter;
