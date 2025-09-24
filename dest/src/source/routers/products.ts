import express from "express";
import { getProductsController, postProductsController } from "../controllers/productControllers.js";

export const productsRouter = express.Router()
productsRouter.use(express.json())


productsRouter.get('/getProducts/query', getProductsController) 

productsRouter.post('/postProducts', postProductsController)