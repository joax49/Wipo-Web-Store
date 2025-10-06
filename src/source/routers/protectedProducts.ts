import express from "express";
import { editProductsController, soldProductsController } from "../controllers/protectedProductsController.js";
import cookieParser from "cookie-parser";

export const protectedProductsRouter = express.Router();
protectedProductsRouter.use(express.json());
protectedProductsRouter.use(cookieParser());

protectedProductsRouter.put('/editProducts', editProductsController);
protectedProductsRouter.put('/soldProducts', soldProductsController);