import { Router } from "express";

import { PostController } from "../controllers/index.js";

const controller = new PostController();
const router = Router();

router
  .get("/", controller.getAllPosts)
  .get("/:id", controller.getPostById)
  .post("/", controller.createPost)
  .patch("/:id", controller.updatePostById)
  .delete("/:id", controller.deletePostById);

export { router as postRouter };
