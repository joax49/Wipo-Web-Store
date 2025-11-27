import { pool } from "./main.js";
export async function storeSale(productId, amount, price) {
    await pool.query(`
        INSERT INTO sales
        (productId, amount, price, date)
        VALUES ($1, $2, $3, NOW()::DATE)
        `, [productId, amount, price]);
}
//# sourceMappingURL=sellProducts.js.map