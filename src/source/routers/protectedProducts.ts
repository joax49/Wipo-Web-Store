import express from "express";
import { editProductsController } from "../controllers/protectedProductsController.js";
import { sellingItemsController, shoppingCartController } from "../controllers/shoppingCartController.js";
import cookieParser from "cookie-parser";

export const protectedProductsRouter = express.Router();
protectedProductsRouter.use(express.json());
protectedProductsRouter.use(cookieParser());

protectedProductsRouter.post('/addToCart', shoppingCartController);
protectedProductsRouter.post('/sellItems', sellingItemsController);

protectedProductsRouter.put('/editProducts', editProductsController);