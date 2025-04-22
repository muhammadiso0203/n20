import { Router } from "express";

import { CommentController } from "../controllers/index.js";

const controller = new CommentController();
const router = Router();

router.get("/", controller.getAllComments);
router.get("/:id", controller.getCommentById);
router.post("/", controller.createComment);
router.patch("/:id", controller.updateCommentById);
router.delete("/:id", controller.deleteCommentById);

export { router as commentRouter };
