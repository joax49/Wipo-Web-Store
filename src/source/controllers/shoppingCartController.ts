import { NextFunction, Request, Response } from "express";
import { searchProductById } from "../database/searchProduct.js";
import { sellProduct } from "../database/sellProducts.js";
import { CartItem, isCartItem } from "../database/typeCasting.js";
import { AppError } from "../utils/appError.js";

export async function shoppingCartController(req: Request, res: Response, next: NextFunction) {
    try {
        const {productId} = req.body;

        if(typeof productId !== "number") {
            throw new Error("The id must be a number")
        }

        const searchedProduct = await searchProductById(productId);

        const product: CartItem = {
            id: searchedProduct.id,
            name: searchedProduct.name,
            price: searchedProduct.price,
            amount: 0
        }

        res.status(201).send(product);
    } catch(err) {
        next(err);
    }
}

export async function sellingItemsController(req: Request, res: Response, next: NextFunction) {
    try {
        const {items} = req.body;

        if (!req.cookies.access_token) {
            throw new AppError(
                "NO_CREDENTIALS",
                "Must provide access token",
                401
            );
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
        next(err);
    }
}