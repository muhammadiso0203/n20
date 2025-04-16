import { Router } from "express";
import { productController } from "../controllers/index.js";
import { authMiddleware, validateBody } from "../middleware/index.js";
import { productSchema, productUpdateSchema } from "../validations/index.js";

const router = Router();

router
  .get("/", productController.findAll)
  .get("/:id", productController.findOne)
  .post(
    "/",
    authMiddleware,
    validateBody(productSchema),
    productController.create
  )
  .put(
    "/:id",
    authMiddleware,
    validateBody(productUpdateSchema),
    productController.update
  )
  .delete("/:id", authMiddleware, productController.delete);

export { router as productRouter };
