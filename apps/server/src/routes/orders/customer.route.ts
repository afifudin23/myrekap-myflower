import { ordersCustomerController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { errorHandler } from "@/utils";
import { Router } from "express";

const ordersCustomerRouter: Router = Router();

ordersCustomerRouter.get("/", [authMiddleware], errorHandler(ordersCustomerController.getUserOrders));
ordersCustomerRouter.get("/:id", [authMiddleware], errorHandler(ordersCustomerController.getOrderById));
ordersCustomerRouter.post("/", [authMiddleware], errorHandler(ordersCustomerController.createOrder));
ordersCustomerRouter.patch("/:id/cancel", [authMiddleware], errorHandler(ordersCustomerController.cancelOrder));
ordersCustomerRouter.patch("/:id/confirm", [authMiddleware], errorHandler(ordersCustomerController.confirmOrder));

export default ordersCustomerRouter;
