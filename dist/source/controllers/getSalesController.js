import { getSales } from "../database/getSales.js";
export async function getSalesController(req, res) {
    try {
        if (!req.cookies.access_token) {
            throw new Error("Invalid access: Must provide token");
        }
        const allSales = await getSales();
        return res.status(201).json({ "sales": allSales });
    }
    catch (err) {
        res.status(401).send(err);
    }
}
//# sourceMappingURL=getSalesController.js.map