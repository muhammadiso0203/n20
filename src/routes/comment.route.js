import { Router } from "express";

import { CommentController } from "../controllers/index.js";

const controller = new CommentController();
const router = Router();

router
  .get("/", controller.getAllComments)
  .get("/:id", controller.getCommentById)
  .post("/", controller.createComment)
  .patch("/:id", controller.updateCommentById)
  .delete("/:id", controller.deleteCommentById);

export { router as commentRouter };
