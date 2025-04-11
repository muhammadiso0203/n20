import { Router } from "express";
import { playersController } from "../controller/index.js";

const router = Router();

router.get("/players", playersController.findAll);
router.get("/players/:id", playersController.findOne);
router.post("/players", playersController.create);
router.put("/players/:id", playersController.update);
router.delete("/players/:id", playersController.delete);

export {router as playersRouter}
