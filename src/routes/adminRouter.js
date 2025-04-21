import { Router } from "express";
import {
  roleGuard,
  validateBody,
  authMiddleware,
} from "../middleware/index.js";
import { adminValidation } from "../validations/index.js";
import { adminController } from "../controllers/index.js";

const router = Router();

router.get("/", authMiddleware, roleGuard("superadmin"), adminController.find);
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
  roleGuard("superadmin"),
  validateBody(adminValidation),
  adminController.update
);
router.delete(
  "/",
  authMiddleware,
  roleGuard("superadmin"),
  validateBody(adminValidation),
  adminController.delete
);

export { router as adminRouter };
