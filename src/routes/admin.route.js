import { Router } from "express";

import { AdminController } from "../controllers/index.js";
import {
  jwtAuthGuard,
  selfGuard,
  superAdminGuard,
} from "../middleware/index.js";

const router = Router();
const controller = new AdminController();

router
  .post("/signupSuperAdmin", controller.signUpSuperAdmin)
  .post("/signupAdmin", jwtAuthGuard, superAdminGuard, controller.signUpAdmin)
  .post("/signinAdmin", controller.signInAdmin)
  .post("/confirmAdmin", controller.signinConfirmAdmin)
  .post("/signoutAdmin", jwtAuthGuard, controller.signOutAdmin)
  .post("/accessToken", controller.accessToken)
  .get("/allAdmins", jwtAuthGuard, superAdminGuard, controller.getAllAdmins)
  .get("/allUsers", jwtAuthGuard, selfGuard, controller.getAllUsers)
  .get("/users/:id", jwtAuthGuard, selfGuard, controller.getUserById)
  .get("/:id", jwtAuthGuard, superAdminGuard, controller.getAdminById)
  .put("/:id", jwtAuthGuard, selfGuard, controller.updateAdminById)
  .delete("/:id", jwtAuthGuard, superAdminGuard, controller.deleteAdminById);

export { router as adminRouter };
