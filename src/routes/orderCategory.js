import { Router } from "express";
import { orderController } from "../controllers/index.js";
import { authMiddleware, validateBody } from "../middleware/index.js";
import { orderSchema, orderUpdateSchema } from "../validations/index.js";

const router = Router();

router
  .get("/", orderController.findAll)
  .get("/:id", orderController.findOne)
  .post("/", authMiddleware, validateBody(orderSchema), orderController.create)
  .put(
    "/:id",
    authMiddleware,
    validateBody(orderUpdateSchema),
    orderController.update
  )
  .delete("/:id", authMiddleware, orderController.delete);

export { router as orderRouter };
