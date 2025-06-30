import { Router } from "express";
import orderRouter from "@/routes/order.route";
import usersRouter from "@/routes/user.route";
import authRouter from "@/routes/auth.route";
import paymentProofRouter from "@/routes/payment-proof.route";
import finishedProductRouter from "@/routes/finished-product.route";
import productRouter from "@/routes/product.route";
import cartItemRouter from "@/routes/cart-item.route";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/carts", cartItemRouter);
rootRouter.use("/orders", orderRouter);
rootRouter.use("/payment-proofs", paymentProofRouter);
rootRouter.use("/finished-products", finishedProductRouter);

export default rootRouter;
