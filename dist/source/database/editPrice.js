import { pool } from "./main.js";
export async function editPrices(oldFloorPrice, oldRoofPrice, multiplier, type) {
    if (typeof type === "string") {
        await pool.query(`
        UPDATE products SET price = ROUND(price * $1::numeric)::integer
        WHERE price > $2 AND price < $3 AND type ILIKE $4
        `, [multiplier, oldFloorPrice, oldRoofPrice, type]);
    }
    else {
        await pool.query(`
        UPDATE products SET price = ROUND(price * $1::numeric)::integer
        WHERE price >= $2 AND price <= $3
        `, [multiplier, oldFloorPrice, oldRoofPrice]);
    }
}
//# sourceMappingURL=editPrice.js.map