import { Request, Response } from "express";
import { searchProduct } from "../database/searchProduct.js";
import { sellProduct } from "../database/sellProducts.js";
import { CartItem } from "../database/main.js";

export async function shoppingCartController(req: Request, res: Response) {
    try {
        const {productName} = req.body;

        if(typeof productName !== "string") {
            throw new Error("The searched product must be a string")
        }

        const searchedProduct = await searchProduct(productName);
        const product: CartItem = {
            id: searchedProduct.id,
            name: searchedProduct.name,
            price: searchedProduct.price,
            amount: 0
        }

        res.status(201).send(product);
    } catch(err) {
        res.status(401).send(err);
    }
}

export async function sellingItemsController(req: Request, res: Response) {
    try {
        const {items} = req.body;
        console.log(items)
        console.log(typeof items)

        for (let i = 0; i < items.length; i++) {
            const item = JSON.parse(items[i])
            console.log(item)
            // if (typeof item === typeof CartItem) {
            //     sellProduct(item.id, item.amount, item.price)
            // }
        }

        res.status(201).send();
    } catch (err) {
        res.status(401).send(err);
    }
}