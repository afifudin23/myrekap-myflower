import errorHandler from "@/utils/error-handler.util";
import { Router } from "express";
import * as finishedProductController from "@/controllers/finished-product.controller";
import { uploadSingle } from "@/utils/upload.util";

const finishedProductRouter: Router = Router();

finishedProductRouter.post(
    "/:orderSummaryId",
    uploadSingle("finishedProduct"),
    errorHandler(finishedProductController.addFinishedProduct)
);

export default finishedProductRouter;
