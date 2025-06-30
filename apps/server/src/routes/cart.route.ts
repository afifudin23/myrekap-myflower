import { cartController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { errorHandler } from "@/utils";
import { Router } from "express";

const cartRouter: Router = Router();

cartRouter.get("/", [authMiddleware], errorHandler(cartController.getUserCartItems));
cartRouter.post("/", [authMiddleware], errorHandler(cartController.upsertCartItem));
cartRouter.delete("/:id", [authMiddleware], errorHandler(cartController.removeCartItem));
cartRouter.delete("/", [authMiddleware], errorHandler(cartController.clearCart));

export default cartRouter;
