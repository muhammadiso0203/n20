import { Router } from "express";

import { ArticleController } from "../controllers/index.js";

const router = Router();

const controller = new ArticleController();

router
  .post("/", controller.createArticle)
  .get("/:id", controller.getArticleByUserId);

export { router as articleRouter };
