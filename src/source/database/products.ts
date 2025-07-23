import { pool } from "./main.js";

export async function getProducts() {
    const allProducts = await pool.query(`
        SELECT * FROM products_wipo
        `)

    return allProducts
}

export async function getFavProducts() {
    const favProducts = await pool.query(`
        SELECT * FROM products_wipo WHERE favorite = true LIMIT 8
        `)
}