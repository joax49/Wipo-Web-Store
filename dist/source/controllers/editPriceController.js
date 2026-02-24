import { editPrices } from "../database/editPrice.js";
export async function editPriceController(req, res) {
    try {
        const { oldFloor, oldRoof, newPrice, type } = req.body;
        if (typeof oldFloor === "number" && typeof oldRoof === "number" && typeof newPrice === "number" && typeof type === "string") {
            await editPrices(oldFloor, oldRoof, newPrice, type);
            return res.status(200).json({ message: "Product updated" });
        }
        return res.status(400).json({ message: "Invalid input types" });
    }
    catch (err) {
        console.error(err);
    }
}
//# sourceMappingURL=editPriceController.js.map