import { Router } from "express";
import { orderController } from "../controllers/index.js";
import {
  authMiddleware,
  validateBody,
  roleGuard,
} from "../middleware/index.js";
import {
  orderValidation,
  orderUpdateValidation,
} from "../validations/index.js";

const router = Router();

router
  .get(
    "/",
    authMiddleware,
    roleGuard("user", "admin", "superadmin"),
    orderController.findAll
  )
  .get(
    "/:id",
    authMiddleware,
    roleGuard("user", "admin", "superadmin"),
    orderController.findOne
  )
  .post(
    "/",
    authMiddleware,
    roleGuard("admin", "superadmin"),
    validateBody(orderValidation),
    orderController.create
  )
  .put(
    "/:id",
    authMiddleware,
    roleGuard("admin", "superadmin"),
    validateBody(orderUpdateValidation),
    orderController.update
  )
  .delete(
    "/:id",
    authMiddleware,
    roleGuard("superadmin"),
    orderController.delete
  );

export { router as orderRouter };
