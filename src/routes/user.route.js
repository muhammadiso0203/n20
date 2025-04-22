import { Router } from "express";

import { UserController } from "../controllers/index.js";

const controller = new UserController();
const router = Router();

router.post("/signup", controller.signUpUser);
router.post("/signin", controller.signInUser);

export { router as userRouter };
