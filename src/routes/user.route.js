import { Router } from "express";

import { UserController } from "../controllers/index.js";
import { detector } from "../middleware/index.js";

const router = Router();

const controller = new UserController();

router.post("/register", detector, controller.registerUser);

export { router as userRouter };
