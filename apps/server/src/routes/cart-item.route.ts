import { cartItemController } from "../controllers";
import { authMiddleware } from "../middlewares";
import { errorHandler } from "../utils";
import { Router } from "express";

const cartItemRouter: Router = Router();

cartItemRouter.get("/", [authMiddleware], errorHandler(cartItemController.getUserCartItems));
cartItemRouter.post("/", [authMiddleware], errorHandler(cartItemController.addToCart));
cartItemRouter.patch("/:productId/increment", [authMiddleware], errorHandler(cartItemController.incrementCartItem));
cartItemRouter.patch("/:productId/decrement", [authMiddleware], errorHandler(cartItemController.decrementCartItem));
cartItemRouter.delete("/:productId", [authMiddleware], errorHandler(cartItemController.deleteCartItem));
cartItemRouter.delete("/", [authMiddleware], errorHandler(cartItemController.clearCartItems));

export default cartItemRouter;
