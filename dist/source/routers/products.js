import express from "express";
import { getProductsController } from "../controllers/productControllers.js";
import { getLastIdController } from "../controllers/getLastIdController.js";
import { searchProductController } from "../controllers/searchProductController.js";
export const productsRouter = express.Router();
productsRouter.use(express.json());
productsRouter.get('/getProducts/query', getProductsController);
productsRouter.get('/getLastId', getLastIdController);
productsRouter.post('/searchProduct', searchProductController);
//# sourceMappingURL=products.js.map