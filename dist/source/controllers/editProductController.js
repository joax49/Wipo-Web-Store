import { editData } from "../database/editProducts.js";
import { AppError } from "../utils/appError.js";
export async function editProductsController(req, res) {
    try {
        if (!req.cookies.access_token) {
            throw new AppError("NO_CREDENTIALS", "Must provide access token", 401);
        }
        const { id, name, price, type, subtype, amount } = req.body;
        editData(id, name?.trim(), price, type?.trim(), subtype?.trim(), amount);
        res.status(200).json({ message: "Product updated" });
    }
    catch (err) {
        res.status(401).send(err);
    }
}
//# sourceMappingURL=editProductController.js.map