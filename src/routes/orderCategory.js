import { Router } from "express";
import { orderController } from "../controllers/index.js";
import { validateBody } from "../middleware/index.js";
import { orderSchema, orderUpdateSchema } from "../validations/index.js";

const router = Router();

router
  .get("/", orderController.findAll)
  .get("/:id", orderController.findOne)
  .post("/", validateBody(orderSchema), orderController.create)
  .put("/:id", validateBody(orderUpdateSchema), orderController.update)
  .delete("/:id", orderController.delete);

export { router as orderRouter };
