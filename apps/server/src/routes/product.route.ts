import { Router } from "express";
import { productController } from "@/controllers";
import { errorHandler, upload } from "@/utils";

const productRouter: Router = Router();

productRouter.get("/", errorHandler(productController.getAllProducts));
productRouter.get("/:id", errorHandler(productController.getProductById));
productRouter.post("/", upload.multiple("images"), errorHandler(productController.createProduct));
productRouter.put("/:id", upload.multiple("images"), errorHandler(productController.updateProduct));
productRouter.delete("/:id", errorHandler(productController.deleteProduct));

export default productRouter;
