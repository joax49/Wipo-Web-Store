import express from "express";
import { productsController } from "../controllers/productControllers.js";
export const productsRouter = express.Router();
productsRouter.use(express.json());
productsRouter.get('/getProducts/query', productsController);
// productsRouter.get("/", (req, res) => 
//     res.status(201).send("hi!")
// )
//# sourceMappingURL=products.js.map