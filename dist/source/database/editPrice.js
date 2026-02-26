import { pool } from "./main.js";
export async function editPrices(oldFloorPrice, oldRoofPrice, newPrice, type) {
    if (typeof type === "string") {
        await pool.query(`
        UPDATE products SET price = $1
        WHERE price > $2 AND price < $3 AND type ILIKE $4
        `, [newPrice, oldFloorPrice, oldRoofPrice, type]);
    }
    else {
        await pool.query(`
        UPDATE products SET price = $1
        WHERE price >= $2 AND price <= $3
        `, [newPrice, oldFloorPrice, oldRoofPrice]);
    }
}
//# sourceMappingURL=editPrice.js.map