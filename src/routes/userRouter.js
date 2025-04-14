import { Router } from "express";
import { userController } from "../controllers/index.js";
import { authSchema, authUpdateSchema } from "../validations/index.js";
import { validateBody } from "../middleware/index.js";

const router = Router();

router
  .post("/", validateBody(authSchema.signIn), userController.profile)
  .put("/:id", validateBody(authUpdateSchema), userController.update)
  .delete("/:id", userController.delete);

export { router as userRouter };
