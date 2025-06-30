import { Router } from "express";
import { authMiddleware, singleSuperadminMiddleware, superadminMiddleware } from "@/middlewares";
import { userController } from "@/controllers";
import { errorHandler } from "@/utils";

const usersRouter: Router = Router();

usersRouter.get("/", [authMiddleware, superadminMiddleware], errorHandler(userController.getAllUsers));
usersRouter.get("/:id", [authMiddleware, superadminMiddleware], errorHandler(userController.getUserById));
usersRouter.post(
  "/",
  [authMiddleware, superadminMiddleware, singleSuperadminMiddleware],
  errorHandler(userController.createNewUser)
);
usersRouter.put(
  "/:id",
  [authMiddleware, superadminMiddleware, singleSuperadminMiddleware],
  errorHandler(userController.updateUser)
);
usersRouter.delete("/:id", [authMiddleware, superadminMiddleware], errorHandler(userController.deleteUser));

export default usersRouter;
