import { Router } from "express";
import { validateBody } from "../middleware/index.js";
import { authSchema } from "../validations/index.js";
import { authController } from "../controllers/index.js";

const router = Router();

router
  .get("/profile", authController.profile)
  .post(
    "/signup",
    validateBody(authSchema.signUp),
    authController.signUp
  )
  .post(
    "/signin",
    validateBody(authSchema.signIn),
    authController.signIn
  );

export { router as AuthRouter };
