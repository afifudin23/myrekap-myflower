import { cartItemController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { errorHandler } from "@/utils";
import { Router } from "express";

const cartItemRouter: Router = Router();

cartItemRouter.get("/", [authMiddleware], errorHandler(cartItemController.getUserCartItems));
cartItemRouter.post("/", [authMiddleware], errorHandler(cartItemController.upsertCartItem));
cartItemRouter.delete("/:id", [authMiddleware], errorHandler(cartItemController.removeCartItem));
cartItemRouter.delete("/", [authMiddleware], errorHandler(cartItemController.clearCartItems));

export default cartItemRouter;
