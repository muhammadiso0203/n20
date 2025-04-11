import { Router } from "express";
import { tournamenGroupsController } from "../controller/index.js";

const router = Router();

router.get("/tournament_groups", tournamenGroupsController.findAll);
router.get("/tournament_groups/:id", tournamenGroupsController.findOne);
router.post("/tournament_groups", tournamenGroupsController.create);
router.put("/tournament_groups/:id", tournamenGroupsController.update);
router.delete("/tournament_groups/:id", tournamenGroupsController.delete);

export {router as tournamentGroupsRouter}
