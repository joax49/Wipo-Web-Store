import express from "express";
import { editProductsController, soldProductsController } from "../controllers/protectedProductsController.js";
import { shoppingCartController } from "../controllers/shoppingCartController.js";
import cookieParser from "cookie-parser";

export const protectedProductsRouter = express.Router();
protectedProductsRouter.use(express.json());
protectedProductsRouter.use(cookieParser());

protectedProductsRouter.post('/addToCart', shoppingCartController);
protectedProductsRouter.put('/editProducts', editProductsController);
protectedProductsRouter.put('/soldProducts', soldProductsController);