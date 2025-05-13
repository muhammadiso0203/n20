import { Router } from "express";

import { ProductController } from "../controller/index.js";

const router = Router();

const controller = new ProductController();

router
  .post("/", controller.createProduct)
  .get("/", controller.getAllProduct)
  .get("/:id", controller.getProductById)
  .put("/:id", controller.updateProductById)
  .delete("/:id", controller.deleteProductById);

export { router as productRouter };
