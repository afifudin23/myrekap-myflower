import { Router } from "express";
import * as productController from "@/controllers/product.controller";
import errorHandler from "@/utils/error-handler.util";

const productRouter: Router = Router();

productRouter.get("/", errorHandler(productController.getAllProducts));
productRouter.get("/:id", errorHandler(productController.getProductById));
productRouter.post("/", errorHandler(productController.createProduct));
productRouter.put("/:id", errorHandler(productController.updateProduct));
productRouter.delete("/:id", errorHandler(productController.deleteProduct));

export default productRouter;