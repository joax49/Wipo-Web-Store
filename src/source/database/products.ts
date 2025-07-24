import { pool } from "./main.js";

export async function getProducts(): Promise<Object[]> {
    const allProducts = await pool.query(`
        SELECT * FROM products_wipo
        `)

    return allProducts.rows
}