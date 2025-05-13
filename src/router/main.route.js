import { Router } from "express";

import { categoryRouter, productRouter } from "./index.js";

const router = Router();

router.use("/category", categoryRouter);
router.use("/product", productRouter);

export { router as mainRouter };
