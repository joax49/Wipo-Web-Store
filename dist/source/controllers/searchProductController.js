import { searchProductByName } from "../database/searchProduct.js";
import { AppError } from "../utils/appError.js";
export async function searchProductController(req, res, next) {
    try {
        const { productName } = req.body;
        if (!req.cookies.access_token) {
            throw new AppError("NO_CREDENTIALS", "Must provide access token", 401);
        }
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
        next(err);
    }
}
//# sourceMappingURL=searchProductController.js.map