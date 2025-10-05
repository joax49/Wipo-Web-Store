import { pool } from "./main.js";

export async function getProducts(): Promise<string[]> {
    const allProducts = await pool.query(`
        SELECT * FROM products
        `)

    return allProducts.rows
}