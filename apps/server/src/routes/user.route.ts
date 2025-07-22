import { Router } from "express";
import { authMiddleware, singleSuperadminMiddleware, superadminMiddleware } from "@/middlewares";
import { userController } from "@/controllers";
import { errorHandler } from "@/utils";

const userRouter: Router = Router();

userRouter.get("/admin", [authMiddleware, superadminMiddleware], errorHandler(userController.getAllAdmins));
userRouter.get("/customer", [authMiddleware], errorHandler(userController.getAllCustomers));
userRouter.get("/:id", [authMiddleware, superadminMiddleware], errorHandler(userController.getUserById));
userRouter.post(
    "/admin",
    [authMiddleware, superadminMiddleware, singleSuperadminMiddleware],
    errorHandler(userController.createAdmin)
);
userRouter.put("/profile", [authMiddleware], errorHandler(userController.updateUserProfile)); // Profile MyFlower
userRouter.put(
    "/:id",
    [authMiddleware, superadminMiddleware, singleSuperadminMiddleware],
    errorHandler(userController.updateAdmin)
);
userRouter.delete("/:id", [authMiddleware, superadminMiddleware], errorHandler(userController.deleteUser));

export default userRouter;
