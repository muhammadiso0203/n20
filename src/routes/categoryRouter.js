import { Router } from "express";
import { categoryController } from "../controllers/index.js";
import {
  authMiddleware,
  roleGuard,
  validateBody,
} from "../middleware/index.js";
import { categoryValidation, categoryUpdateValidation } from "../validations/index.js";

const router = Router();

router
  .get(
    "/",
    authMiddleware,
    roleGuard("user", "admin", "superadmin"),
    categoryController.findAll
  )
  .get(
    "/:id",
    authMiddleware,
    roleGuard("user", "admin", "superadmin"),
    categoryController.findOne
  )
  .post(
    "/",
    authMiddleware,
    roleGuard("admin", "superadmin"),
    validateBody(categoryValidation),
    categoryController.create
  )
  .put(
    "/:id",
    authMiddleware,
    roleGuard("admin", "superadmin"),
    validateBody(categoryUpdateValidation),
    categoryController.update
  )
  .delete(
    "/:id",
    authMiddleware,
    roleGuard("superadmin"),
    categoryController.delete
  );

export { router as categoryRouter };
