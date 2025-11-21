import { Request, Response } from "express";
import { searchProduct } from "../database/searchProduct.js";

export async function shoppingCartController(req: Request, res: Response) {
    try {
        const {product} = req.body;

        if (!req.cookies.access_token) {
            throw new Error("Invalid access: Must provide token")
        }

        const searchedProduct = searchProduct(product);

        res.status(201).send(searchedProduct);
    } catch(err) {
        res.status(401).send(err);
    } 
}