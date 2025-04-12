import { Router } from "express";
import { productController } from "../controllers/index.js";
import { validateBody } from "../middleware/index.js";
import { productSchema, productUpdateSchema } from "../validations/index.js";

const router = Router();

router
  .get("/product", productController.findAll)
  .get("/product/:id", productController.findOne)
  .post("/product", validateBody(productController), productController.create)
  .put(
    "/product/:id",
    validateBody(productUpdateSchema),
    productController.update
  )
  .delete("/product/:id", productController.delete);

export { router as productRouter };
