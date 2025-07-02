import { customerOrderController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { errorHandler, upload } from "@/utils";
import { Router } from "express";

const customerOrderRouter:Router = Router();

customerOrderRouter.get("/",[authMiddleware] ,errorHandler(customerOrderController.getUserOrders));
customerOrderRouter.get("/:id", [authMiddleware], errorHandler(customerOrderController.getOrderById));
customerOrderRouter.post("/", upload.none() ,[authMiddleware], errorHandler(customerOrderController.createOrder));
customerOrderRouter.patch("/:id/cancel", [authMiddleware], errorHandler(customerOrderController.cancelOrder));
customerOrderRouter.patch("/:id/confirm", [authMiddleware], errorHandler(customerOrderController.confirmOrder));

export default customerOrderRouter;