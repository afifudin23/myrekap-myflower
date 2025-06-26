import { Router } from "express";
import orderRouter from "@/routes/order.route";
import usersRouter from "@/routes/user.route";
import authRouter from "@/routes/auth.route";
import paymentProofRouter from "@/routes/payment-proof.route";
import finishedProductRouter from "@/routes/finished-product.route";

const rootRouter: Router = Router();

rootRouter.use("/users", usersRouter);
rootRouter.use("/auth", authRouter);
rootRouter.use("/orders", orderRouter);
rootRouter.use("/payment-proofs", paymentProofRouter);
rootRouter.use("/finished-products", finishedProductRouter);

export default rootRouter;
