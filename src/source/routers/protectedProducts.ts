import express from "express";
import { postProductsController } from "../controllers/protectedProductsController.js";

export const protectedProductsRouter = express.Router()
protectedProductsRouter.use(express.json())

protectedProductsRouter.post('/postProducts', postProductsController)