import { Router } from "express";
import {
  roleGuard,
  validateBody,
  authMiddleware,
} from "../middleware/index.js";
import { adminValidation } from "../validations/index.js";
import { adminController } from "../controllers/index.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleGuard("superadmin"),
  validateBody(adminValidation),
  adminController.find
);
router.post(
  "/",
  authMiddleware,
  roleGuard("superadmin"),
  validateBody(adminValidation),
  adminController.create
);
router.put(
  "/",
  authMiddleware,
  roleGuard("admin", "superadmin"),
  validateBody(adminValidation),
  adminController.update
);

export { router as adminRouter };
