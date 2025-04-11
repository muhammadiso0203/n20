import { Router } from "express";
import { tournamentsController } from "../controller/index.js";

const router = Router();

router.get("/tournaments", tournamentsController.findAll);
router.get("/tournaments/:id", tournamentsController.findOne);
router.post("/tournaments", tournamentsController.create);
router.put("/tournaments/:id", tournamentsController.update);
router.delete("/tournaments/:id", tournamentsController.delete);

export {router as tournamentsRouter}