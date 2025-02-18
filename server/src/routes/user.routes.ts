import express from "express";
import { UserController } from "../controllers/user.controller";


const router = express.Router();

// Define user routes
router.get("/", UserController.getUser);

export default router;

