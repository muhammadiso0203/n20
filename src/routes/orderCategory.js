import { Router } from "express";
import { orderController } from "../controllers/index.js";
import { validateBody } from "../middleware/index.js";
import { orderSchema, orderUpdateSchema } from "../validations/index.js";

const router = Router();

router
  .get("/order", orderController.findAll)
  .get("/order/:id", orderController.findOne)
  .post("/order", validateBody(orderSchema), orderController.create)
  .put("/order/:id", validateBody(orderUpdateSchema), orderController.update)
  .delete("/order/:id", orderController.delete);

export { router as orderRouter };
