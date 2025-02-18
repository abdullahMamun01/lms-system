import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validateRequest";
import { LoginSchema, RegisterSchema } from "../validations/auth.validation";

const router = express.Router();

router.post("/signin",validateRequest(LoginSchema), AuthController.loginUser);
router.post("/signup",validateRequest(RegisterSchema), AuthController.registerUser);

export default router;
