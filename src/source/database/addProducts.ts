import { pool } from "./main.js";


export async function insertProduct(productName: string, productPrice: number | null) {
    await pool.query(`
        INSERT INTO products_wipo
        (name, price)
        VALUES ($1, $2)
        `, [productName, productPrice])
}