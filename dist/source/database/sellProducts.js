import { pool } from "./main.js";
export async function sellProduct(productId, amount, price) {
    await pool.query(`
        INSERT INTO sales
        (productId, amount, price, date)
        VALUES ($1, $2, $3, NOW()::DATE)
        `, [productId, amount, price]);
    await pool.query(`
        UPDATE products
        SET amount = amount - $1
        WHERE id = $2
        `, [amount, productId]);
}
//# sourceMappingURL=sellProducts.js.map