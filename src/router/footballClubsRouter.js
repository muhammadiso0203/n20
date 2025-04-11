import { Router } from "express";
import { footballClubsController } from "../controller/index.js";

const router = Router();

router.get("/football_clubs", footballClubsController.findAll);
router.get("/football_clubs/:id", footballClubsController.findOne);
router.post("/football_clubs", footballClubsController.create);
router.put("/football_clubs/:id", footballClubsController.update);
router.delete("/football_clubs/:id", footballClubsController.delete);

export {router as footballClubsRouter}