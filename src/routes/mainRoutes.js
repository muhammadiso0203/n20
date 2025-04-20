import { Router } from "express";
import {
  authAdminRouter,
  adminRouter,
  AuthRouter,
  authSuperAdminRouter,
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
router.use("/admin", adminRouter);
router.use("/auth/admin", authAdminRouter);
router.use("/auth/superadmin", authSuperAdminRouter);


export { router as mainRouter };
