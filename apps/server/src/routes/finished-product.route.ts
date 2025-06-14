import errorHandler from "@/utils/error-handler.util";
import { Router } from "express";
import * as finishedProductController from "@/controllers/finished-product.controller";
import upload from "@/utils/upload.util";

const finishedProductRouter: Router = Router();

finishedProductRouter.post(
    "/:orderSummaryId",
    upload.single("finishedProduct"),
    errorHandler(finishedProductController.addFinishedProduct)
);

export default finishedProductRouter;
