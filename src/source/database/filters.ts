import { pool } from "./main.js";

export async function favoriteProdsFilter() {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE favorite <> true LIMIT 8
        `);

    return products.rows
}

export async function priceFilter(floorPrice: Number, roofPrice: Number) {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT (price > $1 AND price < $2)
        `, [floorPrice, roofPrice]);

    return products.rows
}