import { Router } from "express";

import { CategoryController } from "../controller/index.js";

const router = Router();

const controller = new CategoryController();

router
  .post("/", controller.createCategory)
  .get("/", controller.getAllCategory)
  .get("/:id", controller.getCategoryById)
  .put("/:id", controller.updateCategoryById)
  .delete("/:id", controller.deleteCategoryById);

export { router as categoryRouter };
