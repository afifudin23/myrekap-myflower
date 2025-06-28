import { Router } from "express";
import * as productController from "@/controllers/product.controller";
import errorHandler from "@/utils/error-handler.util";
import { uploadMultiple } from "@/utils/upload.util";

const productRouter: Router = Router();

productRouter.get("/", errorHandler(productController.getAllProducts));
productRouter.get("/:id", errorHandler(productController.getProductById));
productRouter.post("/", uploadMultiple("productImage"), errorHandler(productController.createProduct));
productRouter.put("/:id", uploadMultiple("productImage"), errorHandler(productController.updateProduct));
productRouter.delete("/:id", errorHandler(productController.deleteProduct));

export default productRouter;
