import { getSales } from "../database/getSales.js";
export async function getSalesController(req, res) {
    const allSales = getSales();
    return res.status(201).json({ "sales": allSales });
}
//# sourceMappingURL=getSalesController.js.map