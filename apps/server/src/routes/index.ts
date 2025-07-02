import { Router } from "express";
import usersRouter from "@/routes/user.route";
import authRouter from "@/routes/auth.route";
import paymentProofRouter from "@/routes/payment-proof.route";
import finishedProductRouter from "@/routes/finished-product.route";
import productRouter from "@/routes/product.route";
import cartItemRouter from "@/routes/cart-item.route";
import adminOrderRouter from "@/routes/orders/admin-order.route";
import customerOrderRouter from "@/routes/orders/customer-order.route";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/carts", cartItemRouter);
rootRouter.use("/orders", customerOrderRouter);
rootRouter.use("/admin/orders", adminOrderRouter);
rootRouter.use("/payment-proofs", paymentProofRouter);
rootRouter.use("/finished-products", finishedProductRouter);

export default rootRouter;
