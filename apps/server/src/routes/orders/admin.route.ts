import { ordersAdminController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { errorHandler, upload } from "@/utils";
import { Router } from "express";

const ordersAdminRouter: Router = Router();

ordersAdminRouter.get("/", [authMiddleware], errorHandler(ordersAdminController.getAllOrders));
ordersAdminRouter.get("/:id", [authMiddleware], errorHandler(ordersAdminController.getOrderById));
ordersAdminRouter.post(
    "/",
    [authMiddleware],
    upload.single("paymentProof"),
    errorHandler(ordersAdminController.createOrder)
);
ordersAdminRouter.put(
    "/:id/edit",
    [authMiddleware],
    upload.single("paymentProof"),
    errorHandler(ordersAdminController.updateOrder)
);
ordersAdminRouter.post("/pdf", [authMiddleware], errorHandler(ordersAdminController.printOrder));
ordersAdminRouter.patch("/:id/order-status", [authMiddleware], errorHandler(ordersAdminController.updateOrderStatus));

ordersAdminRouter.post(
    "/:orderId/finished-product",
    [authMiddleware],
    upload.single("finishedProduct"),
    errorHandler(ordersAdminController.addFinishedProduct)
);

export default ordersAdminRouter;
