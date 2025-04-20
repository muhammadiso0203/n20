import { Router } from "express";
import { authSuperAdminController } from "../controllers/index.js";
import {
  validateBody,
  roleGuard,
  authMiddleware,
} from "../middleware/index.js";
import { adminValidation } from "../validations/index.js";

const router = Router();

router.post(
  "/signin",
  validateBody(adminValidation),
  authSuperAdminController.signIn
);
router.post(
  "/profile",
  authMiddleware,
  roleGuard("superadmin"),
  validateBody(adminValidation),
  authSuperAdminController.profile
);

export { router as authSuperAdminRouter };
