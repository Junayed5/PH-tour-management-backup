import { userController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import { Router } from "express";
import { Role } from "./user.interface";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();



router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser
);
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userController.getAllUsers);

export const userRoutes = router;
