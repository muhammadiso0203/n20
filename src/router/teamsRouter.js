import { Router } from "express";
import { teamsController } from "../controller/index.js";

const router = Router();

router.get("/teams", teamsController.findAll);
router.get("/teams/:id", teamsController.findOne);
router.post("/teams", teamsController.create);
router.put("/teams/:id", teamsController.update);
router.delete("/teams/:id", teamsController.delete);

export {router as teamsRouter}
