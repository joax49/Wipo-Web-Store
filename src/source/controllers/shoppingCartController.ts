import { Request, Response } from "express";
import { searchProduct } from "../database/searchProduct.js";
import { sellProduct } from "../database/sellProducts.js";
import { CartItem, isCartItem } from "../database/typeCasting.js";

export async function shoppingCartController(req: Request, res: Response) {
    try {
        const {productId} = req.body;

        if(typeof productId !== "number") {
            throw new Error("The id must be a number")
        }

        const searchedProduct = await searchProduct(productId);

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

        if (!req.cookies.access_token) {
            throw new Error("Invalid access: Must provide token")
        }

        // If "items" is not an array
        if (!Array.isArray(items)) {
            return res.status(400).json({ error: "items must be an array" });
        }

        // validate each item
        if (!items.every(isCartItem)) {
            return res.status(400).json({ error: "Invalid item structure" });
        }

        for (let i = 0; i < items.length; i++) {
            console.log(items[i])
            sellProduct(items[i].id, items[i].amount, items[i].price)
        }

        res.status(201).send("Items sold correctly");
    } catch (err) {
        res.status(500).json({error: "Server error"});
    }
}