import { searchProductByName } from "../database/searchProduct.js";
export async function editProductsController(req, res) {
    try {
        const { productName } = req.body;
        if (!productName || typeof productName !== "string") {
            return res.status(400).json({ error: "Invalid product name" });
        }
        const product = await searchProductByName(productName);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (err) {
        res.status(401).send({ err });
    }
}
//# sourceMappingURL=editProductController.js.map