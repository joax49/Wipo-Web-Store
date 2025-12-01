import { searchProduct } from "../database/searchProduct.js";
import { sellProduct } from "../database/sellProducts.js";
import { isCartItem } from "../database/typeCasting.js";
import { getSales } from "../database/getSales.js";
export async function shoppingCartController(req, res) {
    try {
        const { productName } = req.body;
        if (typeof productName !== "string") {
            throw new Error("The searched product must be a string");
        }
        const searchedProduct = await searchProduct(productName);
        const product = {
            id: searchedProduct.id,
            name: searchedProduct.name,
            price: searchedProduct.price,
            amount: 0
        };
        res.status(201).send(product);
    }
    catch (err) {
        res.status(401).send(err);
    }
}
export async function sellingItemsController(req, res) {
    try {
        const { items } = req.body;
        console.log(items);
        // If "items" is not an array
        if (!Array.isArray(items)) {
            return res.status(400).json({ error: "items must be an array" });
        }
        // validate each item
        if (!items.every(isCartItem)) {
            return res.status(400).json({ error: "Invalid item structure" });
        }
        for (let i = 0; i < items.length; i++) {
            console.log(items[i]);
            sellProduct(items[i].id, items[i].amount, items[i].price);
        }
        const sales = await getSales();
        console.log(sales);
        res.status(201).send(sales);
    }
    catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}
//# sourceMappingURL=shoppingCartController.js.map