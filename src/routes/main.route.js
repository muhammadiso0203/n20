import { Router } from "express";

import { userRouter, articleRouter, deviceLogRouter } from "./index.js";

const router = Router();

router.use("/", userRouter);
router.use("/articles", articleRouter);
router.use("/devices", deviceLogRouter);

export { router as mainRouter };
