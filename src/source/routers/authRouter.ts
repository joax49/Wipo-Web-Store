import express from "express"
import { authController } from "../controllers/authController.js";
import cookieParser from "cookie-parser";

export const authRouter = express.Router();
authRouter.use(express.json());
authRouter.use(cookieParser());

authRouter.post('/auth', authController);