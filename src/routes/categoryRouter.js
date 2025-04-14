import { Router } from "express";
import { categoryController } from "../controllers/index.js";
import { validateBody } from "../middleware/index.js";
import { categorySchema, categoryUpdateSchema } from "../validations/index.js";

const router = Router();

router
  .get("/", categoryController.findAll)
  .get("/:id", categoryController.findOne)
  .post("/", validateBody(categorySchema), categoryController.create)
  .put("/:id", validateBody(categoryUpdateSchema), categoryController.update)
  .delete("/:id", categoryController.delete);

export { router as categoryRouter };
