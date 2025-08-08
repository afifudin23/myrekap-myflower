import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { authController } from "../controllers";
import { errorHandler } from "../utils";

const authRouter: Router = Router();

authRouter.post("/login", errorHandler(authController.loginUser));
authRouter.post("/register", errorHandler(authController.registerCustomer));
authRouter.post("/resend-verify-email", errorHandler(authController.resendVerificationEmail));
authRouter.get("/verify-email", errorHandler(authController.verifyEmail));
authRouter.get("/verify", authMiddleware, errorHandler(authController.verify));
authRouter.post("/forgot-password", errorHandler(authController.forgotPassword));
authRouter.post("/reset-password", errorHandler(authController.resetPassword));
authRouter.post("/logout", authMiddleware, errorHandler(authController.logoutUser));

export default authRouter;
