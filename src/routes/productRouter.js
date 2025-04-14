import { Router } from "express";
import { productController } from "../controllers/index.js";
import { validateBody } from "../middleware/index.js";
import { productSchema, productUpdateSchema } from "../validations/index.js";

const router = Router();

router
  .get("/", productController.findAll)
  .get("/:id", productController.findOne)
  .post("/", validateBody(productSchema), productController.create)
  .put("/:id", validateBody(productUpdateSchema), productController.update)
  .delete("/:id", productController.delete);

export { router as productRouter };
