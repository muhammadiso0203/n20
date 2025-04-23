import { Router } from "express";

import { commentRouter, postRouter, userRouter, adminRouter } from "./index.js";

const router = Router();

router.use("/auth/user", userRouter);
router.use("/comment", commentRouter);
router.use("/post", postRouter);
router.use("/auth/admin", adminRouter);

export { router as mainRouter };
