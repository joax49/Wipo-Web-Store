import { pool } from "./main.js";

export async function favoriteProdsFilter() {
    const favProducts = await pool.query(`
        SELECT * FROM products_wipo WHERE favorite <> true LIMIT 8
        `)

    return favProducts.rows
}