import { Router } from "express";

import { commentRouter, postRouter, userRouter, adminRouter } from "./index.js";

const router = Router();

router
  .use("/auth/user", userRouter)
  .use("/comment", commentRouter)
  .use("/post", postRouter)
  .use("/auth/admin", adminRouter);

export { router as mainRouter };
