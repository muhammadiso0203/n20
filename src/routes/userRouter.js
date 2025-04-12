import { Router } from "express";
import { userController } from "../controllers/index.js";
import { authSchema, authUpdateSchema } from "../validations/index.js";
import { validateBody } from "../middleware/index.js";

const router = Router();

router
  .post("/profile", validateBody(authSchema.signIn), userController.profile)
  .put("/profile/:id", validateBody(authUpdateSchema), userController.update)
  .delete("/profile/:id", userController.delete);

export { router as userRouter };
