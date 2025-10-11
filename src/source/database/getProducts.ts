import { pool } from "./main.js";

export async function getProducts(offsetValue: number): Promise<string[]> {
    const allProducts = await pool.query(`
        SELECT * FROM products WHERE amount > 0 OFFSET $1 LIMIT 20;
        `, [offsetValue])

    return allProducts.rows
}