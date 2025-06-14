import { Router } from "express";
import authController from "@/controllers/auth.controller";
import errorHandler from "@/utils/error-handler.util";
import { authMiddleware } from "@/middlewares";

const authRouter: Router = Router();

authRouter.post("/login", errorHandler(authController.loginUser));
authRouter.get("/verify", authMiddleware, errorHandler(authController.verify));
authRouter.post("/logout", authMiddleware, errorHandler(authController.logoutUser));

export default authRouter;
