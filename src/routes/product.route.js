import { Router } from "express";

import { ProductController } from "../controllers/index.js";

const router = Router();
const controller = new ProductController();

router
  .post("/", controller.createProduct)
  .get("/", controller.findAllProduct)
  .get("/:id", controller.findProductById)
  .put("/:id", controller.updateProductById)
  .delete("/:id", controller.deleteProductById);

export { router as productRouter };
