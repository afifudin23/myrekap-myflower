import { Router } from "express";
import { finishedProductController } from "@/controllers";
import { errorHandler, upload } from "@/utils";

const finishedProductRouter: Router = Router();

finishedProductRouter.post(
    "/:orderSummaryId",
    upload.single("finishedProduct"),
    errorHandler(finishedProductController.addFinishedProduct)
);

export default finishedProductRouter;
