import { Router } from "express";

import { DeviceLogController } from "../controllers/index.js";

const router = Router();

const controller = new DeviceLogController();

router.get("/:id", controller.getDeviceLogByUserId);

export { router as deviceLogRouter };
