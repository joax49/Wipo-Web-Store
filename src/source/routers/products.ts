import express from "express";
import { productsController, favProductsController } from "../controllers/productControllers.js";

export const productsRouter = express.Router()
productsRouter.use(express.json())


productsRouter.get('/getProducts', productsController)

productsRouter.get('/getFavProducts', favProductsController)