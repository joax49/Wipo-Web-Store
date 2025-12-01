import { pool } from "./main.js";
import { Product } from "./typeCasting.js";

export async function getProducts(): Promise<Product[]> {
    const allProducts = await pool.query(`
        SELECT * FROM products WHERE amount > 0
        `)

    return allProducts.rows
}