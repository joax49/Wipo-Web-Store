import express from "express";
import { postProductsController } from "../controllers/protectedProductsController.js";
import cookieParser from "cookie-parser";

export const protectedProductsRouter = express.Router()
protectedProductsRouter.use(express.json())
protectedProductsRouter.use(cookieParser());

protectedProductsRouter.post('/postProducts', postProductsController)