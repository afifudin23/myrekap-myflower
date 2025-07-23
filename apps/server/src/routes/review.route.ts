import { reviewController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { errorHandler } from "@/utils";
import { Router } from "express";

const reviewRouter: Router = Router({ mergeParams: true });

reviewRouter.get("/", errorHandler(reviewController.getReviewsByProductId));
reviewRouter.post("/", [authMiddleware], errorHandler(reviewController.createReview));
reviewRouter.put("/:reviewId", [authMiddleware], errorHandler(reviewController.updateReview));
reviewRouter.delete("/:reviewId", [authMiddleware], errorHandler(reviewController.deleteReview));

export default reviewRouter;
