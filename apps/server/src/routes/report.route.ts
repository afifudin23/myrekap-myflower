import { reportController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { errorHandler } from "@/utils";
import { Router } from "express";

const reportRouter: Router = Router();

reportRouter.post("/pdf", [authMiddleware], errorHandler(reportController.printReport));

export default reportRouter;
