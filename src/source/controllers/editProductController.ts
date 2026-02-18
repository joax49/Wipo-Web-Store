import { Request, Response } from "express";
import { searchProductByName } from "../database/searchProduct.js";

export async function editProductsController(req: Request, res: Response) {
    try {
        const { productName } = req.body;

        const product = await searchProductByName(productName);
        res.status(201).send(product);
    } catch (err) {
        res.status(401).send({err});
    }
}