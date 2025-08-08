import { Router } from "express";
import { productController } from "../controllers";
import { errorHandler, upload } from "../utils";
import { authMiddleware } from "../middlewares";

const productRouter: Router = Router();

productRouter.get("/", [authMiddleware], errorHandler(productController.getAllProducts));
productRouter.get("/stock-report", [authMiddleware], errorHandler(productController.getMonthlyStockReport));
productRouter.get("/:id", [authMiddleware], errorHandler(productController.getProductById));
productRouter.post("/", [authMiddleware], upload.multiple("images"), errorHandler(productController.createProduct));
productRouter.post("/:id/stock", [authMiddleware], errorHandler(productController.manageProductStock));
productRouter.put("/:id", [authMiddleware], upload.multiple("images"), errorHandler(productController.updateProduct));
productRouter.delete("/:id", [authMiddleware], errorHandler(productController.deleteProduct));

export default productRouter;
