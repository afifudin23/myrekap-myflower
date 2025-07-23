import { Router } from "express";
import authRouter from "@/routes/auth.route";
import paymentProofRouter from "@/routes/payment-proof.route";
import productRouter from "@/routes/product.route";
import cartItemRouter from "@/routes/cart-item.route";
import transactionRouter from "@/routes/transaction.route";
import ordersCustomerRouter from "@/routes/orders/customer.route";
import ordersAdminRouter from "@/routes/orders/admin.route";
import userRouter from "@/routes/user.route";
import reviewRouter from "@/routes/review.route";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/products/:productId/reviews", reviewRouter);
rootRouter.use("/carts", cartItemRouter);
rootRouter.use("/orders/admin", ordersAdminRouter);
rootRouter.use("/orders/customer", ordersCustomerRouter);
rootRouter.use("/payment-proofs", paymentProofRouter);
rootRouter.use("/transactions", transactionRouter);

export default rootRouter;
