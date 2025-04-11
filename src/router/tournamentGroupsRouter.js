import { Router } from "express";
import { tournamentGroupController } from "../controller/index.js";

const router = Router();

router.get("/tournament_groups", tournamentGroupController.findAll);
router.get("/tournament_groups/:id", tournamentGroupController.findOne);
router.post("/tournament_groups", tournamentGroupController.create);
router.put("/tournament_groups/:id", tournamentGroupController.update);
router.delete("/tournament_groups/:id", tournamentGroupController.delete);

export {router as tournamentGroupsRouter}
