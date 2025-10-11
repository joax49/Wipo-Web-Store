import express from "express";
import { getProductsController } from "../controllers/productControllers.js";
export const productsRouter = express.Router();
productsRouter.use(express.json());
productsRouter.get('/getProducts/query/:page', getProductsController);
//# sourceMappingURL=products.js.map