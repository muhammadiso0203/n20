import { Router } from "express";
import { matchFixturesController } from "../controller/index.js";

const router = Router();

router.get("/match_fixtures", matchFixturesController.findAll);
router.get("/match_fixtures/:id", matchFixturesController.findOne);
router.post("/match_fixtures", matchFixturesController.create);
router.put("/match_fixtures/:id", matchFixturesController.update);
router.delete("/match_fixtures/:id", matchFixturesController.delete);

export {router as matchFixturesRouter}
