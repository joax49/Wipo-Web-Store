import { pool } from "./main.js";
export async function editPrices(oldFloorPrice, oldRoofPrice, newPrice, type) {
    await pool.query(`
        UPDATE products SET price = $1
        WHERE price > $2 AND price < $3 AND type = $4
        `, [newPrice, oldFloorPrice, oldRoofPrice, type]);
}
//# sourceMappingURL=editPrice.js.map