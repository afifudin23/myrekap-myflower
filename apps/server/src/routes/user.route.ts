import { Router } from "express";
import { authMiddleware, singleSuperadminMiddleware, superadminMiddleware } from "@/middlewares";
import { userController } from "@/controllers";
import { errorHandler } from "@/utils";

const userRouter: Router = Router();

userRouter.get("/admin", [authMiddleware, superadminMiddleware], errorHandler(userController.getAllAdmins));
userRouter.get("/customer", [authMiddleware, superadminMiddleware], errorHandler(userController.getAllCustomers));
userRouter.get("/:id", [authMiddleware, superadminMiddleware], errorHandler(userController.getUserById));
userRouter.post("/customer", errorHandler(userController.createCustomer));
userRouter.post(
    "/admin",
    [authMiddleware, superadminMiddleware, singleSuperadminMiddleware],
    errorHandler(userController.createAdmin)
);
userRouter.put(
    "/:id",
    [authMiddleware, superadminMiddleware, singleSuperadminMiddleware],
    errorHandler(userController.updateUser)
);
userRouter.delete("/:id", [authMiddleware, superadminMiddleware], errorHandler(userController.deleteUser));

export default userRouter;
