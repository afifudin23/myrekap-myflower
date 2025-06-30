import { Router } from "express";
import { authMiddleware } from "@/middlewares";
import { authController } from "@/controllers";
import { errorHandler } from "@/utils";

const authRouter: Router = Router();

authRouter.post("/login", errorHandler(authController.loginUser));
authRouter.get("/verify", authMiddleware, errorHandler(authController.verify));
authRouter.post("/logout", authMiddleware, errorHandler(authController.logoutUser));

export default authRouter;
