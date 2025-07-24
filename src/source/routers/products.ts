import express from "express";
import { productsController} from "../controllers/productControllers.js";

export const productsRouter = express.Router()
productsRouter.use(express.json())


productsRouter.post('/getProducts', productsController)