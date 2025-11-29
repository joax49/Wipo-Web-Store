import { searchProduct } from "../database/searchProduct.js";
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
        console.log(typeof items);
        for (let i = 0; i < items.length; i++) {
            const item = JSON.parse(items[i]);
            console.log(item);
            // if (typeof item === typeof CartItem) {
            //     sellProduct(item.id, item.amount, item.price)
            // }
        }
        res.status(201).send();
    }
    catch (err) {
        res.status(401).send(err);
    }
}
//# sourceMappingURL=shoppingCartController.js.map