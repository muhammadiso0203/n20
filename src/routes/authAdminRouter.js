import { Router } from "express";
import { authAdminController } from "../controllers/index.js";
import {
  validateBody,
  roleGuard,
  authMiddleware,
} from "../middleware/index.js";
import { adminValidation } from "../validations/index.js";

const router = Router();

router.post(
  "/signup",
  authMiddleware,
  roleGuard("superadmin"),
  validateBody(adminValidation),
  authAdminController.signUp
);
router.post(
  "/signin",
  authMiddleware,
  roleGuard("admin", "superadmin"),
  validateBody(adminValidation),
  authAdminController.signIn
);
router.post(
  "/profile",
  authMiddleware,
  roleGuard("admin", "superadmin"),
  validateBody(adminValidation),
  authAdminController.profile
);

export { router as authAdminRouter };
