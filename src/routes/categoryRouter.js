import { Router } from "express";
import { categoryController } from "../controllers/index.js";
import { authMiddleware, validateBody } from "../middleware/index.js";
import { categorySchema, categoryUpdateSchema } from "../validations/index.js";

const router = Router();

router
  .get("/", categoryController.findAll)
  .get("/:id", categoryController.findOne)
  .post(
    "/",
    authMiddleware,
    validateBody(categorySchema),
    categoryController.create
  )
  .put(
    "/:id",
    authMiddleware,
    validateBody(categoryUpdateSchema),
    categoryController.update
  )
  .delete("/:id", authMiddleware, categoryController.delete);

export { router as categoryRouter };
