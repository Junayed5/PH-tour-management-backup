import { userController } from "./user.controller";
import { createUserZodSchema } from "./user.validation";
import validateRequest from "../../middleware/validateRequest";
import { Router } from "express";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser
);
router.get("/", userController.getAllUsers);

export const userRoutes = router;
