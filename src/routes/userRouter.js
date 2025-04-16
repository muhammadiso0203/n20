import { Router } from "express";
import { userController } from "../controllers/index.js";
import { authSchema, authUpdateSchema } from "../validations/index.js";
import { authMiddleware, validateBody } from "../middleware/index.js";

const router = Router();

router
  .post("/", validateBody(authSchema.signIn), userController.profile)
  .put(
    "/:id",
    authMiddleware,
    validateBody(authUpdateSchema),
    userController.update
  )
  .delete("/:id", authMiddleware, userController.delete);

export { router as userRouter };
