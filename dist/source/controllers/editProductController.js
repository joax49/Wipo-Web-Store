import { searchProductByName } from "../database/searchProduct.js";
export async function editProductsController(req, res) {
    try {
        const { productName } = req.body;
        const product = await searchProductByName(productName);
        res.status(201).send(product);
    }
    catch (err) {
        res.status(401).send({ err });
    }
}
//# sourceMappingURL=editProductController.js.map