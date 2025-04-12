import { Router } from "express";
import { categoryController } from "../controllers/index.js";
import { validateBody } from "../middleware/index.js";
import { categorySchema, categoryUpdateSchema } from "../validations/index.js";

const router = Router();

router
  .get("/category", categoryController.findAll)
  .get("/category/:id", categoryController.findOne)
  .post("/category", validateBody(categorySchema), categoryController.create)
  .put(
    "/category/:id",
    validateBody(categoryUpdateSchema),
    categoryController.update
  )
  .delete("/category/:id", categoryController.delete);

export { router as categoryRouter };
