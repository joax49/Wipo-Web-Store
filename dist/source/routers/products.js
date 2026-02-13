import express from "express";
import { getProductsController } from "../controllers/productControllers.js";
import { getLastIdController } from "../controllers/getLastIdController.js";
export const productsRouter = express.Router();
productsRouter.use(express.json());
productsRouter.get('/getProducts/query', getProductsController);
productsRouter.get('/getLastId', getLastIdController);
//# sourceMappingURL=products.js.map