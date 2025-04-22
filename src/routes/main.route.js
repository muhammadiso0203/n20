import { Router } from "express";

import { commentRouter, postRouter, userRouter } from "./index.js";

const router = Router();

router.use("/auth/user", userRouter);
router.use("/comment", commentRouter);
router.use("/post", postRouter);

export { router as mainRouter };
