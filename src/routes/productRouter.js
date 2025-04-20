import { Router } from "express";
import { productController } from "../controllers/index.js";
import {
  authMiddleware,
  validateBody,
  roleGuard,
} from "../middleware/index.js";
import { productValidation, productUpdateValidation } from "../validations/index.js";

const router = Router();

router
  .get(
    "/",
    authMiddleware,
    roleGuard("user", "admin", "superadmin"),
    productController.findAll
  )
  .get(
    "/:id",
    authMiddleware,
    roleGuard("user", "admin", "superadmin"),
    productController.findOne
  )
  .post(
    "/",
    authMiddleware,
    roleGuard("admin", "superadmin"),
    validateBody(productValidation),
    productController.create
  )
  .put(
    "/:id",
    authMiddleware,
    roleGuard("admin", "superadmin"),
    validateBody(productUpdateValidation),
    productController.update
  )
  .delete(
    "/:id",
    authMiddleware,
    roleGuard("superadmin"),
    productController.delete
  );

export { router as productRouter };
