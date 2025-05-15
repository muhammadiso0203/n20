import { Router } from "express";

import { CategoryController } from "../controllers/index.js";

const router = Router();
const controller = new CategoryController();

router
  .post("/", controller.createCategory)
  .get("/", controller.findAllCategory)
  .get("/:id", controller.findOneCategory)
  .put("/:id", controller.updateCategoryById)
  .delete("/:id", controller.deleteCategoryById);

export { router as categoryRouter };
