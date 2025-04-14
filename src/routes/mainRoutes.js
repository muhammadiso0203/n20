import { Router } from "express";
import {
  AuthRouter,
  categoryRouter,
  orderRouter,
  productRouter,
  userRouter,
} from "./index.js";

const router = Router();

router.use("/auth", AuthRouter);
router.use("/category", categoryRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/profile", userRouter);

export { router as mainRouter };
