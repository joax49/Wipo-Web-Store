import { Request, Response } from "express";
import { searchProduct } from "../database/searchProduct.js";
import { sellProduct } from "../database/sellProducts.js";

export async function shoppingCartController(req: Request, res: Response) {
    try {
        const {product} = req.body;

        if(typeof product !== "string") {
            throw new Error("The searched product must be a string")
        }

        const searchedProduct = await searchProduct(product);

        res.status(201).send(searchedProduct);
    } catch(err) {
        res.status(401).send(err);
    }
}

export async function sellingItemsController(req: Request, res: Response) {
    try {
        const {items} = req.body;

        for (let i = 0; i < items.length; i++) {
            const item = items[i]

            sellProduct(item.id, item.amount, item.price)
        }

        res.status(201).send();
    } catch (err) {
        res.status(401).send(err);
    }
}