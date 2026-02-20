import { Request, Response } from "express";
import { searchProductByName } from "../database/searchProduct.js";

export async function searchProductController(req: Request, res: Response) {
    try {
        const { productName } = req.body;

        if(!productName || typeof productName !=="string") {
            return res.status(400).json({ error: "Invalid product name" });
        }

        const product = await searchProductByName(productName);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(401).send({err});
    }
}