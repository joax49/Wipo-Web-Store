import { searchProduct } from "../database/searchProduct.js";
export async function shoppingCartController(req, res) {
    try {
        const { product } = req.body;
        if (typeof product !== "string") {
            throw new Error("The searched product must be a string");
        }
        const searchedProduct = await searchProduct(product);
        res.status(201).send(searchedProduct);
    }
    catch (err) {
        res.status(401).send(err);
    }
}
export async function sellingItemsController(req, res) {
    try {
        const { items } = req.body;
        for (let i = 0; i < items.length; i++) {
            console.log(items[i]);
        }
        res.status(201).send();
    }
    catch (err) {
        res.status(401).send(err);
    }
}
//# sourceMappingURL=shoppingCartController.js.map