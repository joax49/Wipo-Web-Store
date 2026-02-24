import express from "express";
import { sellingItemsController, shoppingCartController } from "../controllers/shoppingCartController.js";
import cookieParser from "cookie-parser";
import { editProductsController } from "../controllers/editProductController.js";
import { editPriceController } from "../controllers/editPriceController.js";
export const protectedProductsRouter = express.Router();
protectedProductsRouter.use(express.json());
protectedProductsRouter.use(cookieParser());
protectedProductsRouter.post('/addToCart', shoppingCartController);
protectedProductsRouter.post('/sellItems', sellingItemsController);
protectedProductsRouter.put('/editProducts', editProductsController);
protectedProductsRouter.put('/editPrice', editPriceController);
//# sourceMappingURL=protectedProducts.js.map