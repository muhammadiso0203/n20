import { Router } from "express";

import { PostController } from "../controllers/index.js";

const controller = new PostController();
const router = Router();

router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPostById);
router.post("/", controller.createPost);
router.patch("/:id", controller.updatePostById);
router.delete("/:id", controller.deletePostById);

export { router as postRouter };
