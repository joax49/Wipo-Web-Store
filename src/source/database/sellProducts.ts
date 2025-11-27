import { pool } from "./main.js";

export async function storeSale(productId: number, amount: number, price: number) {
    await pool.query(`
        INSERT INTO sales
        (productId, amount, price, date)
        VALUES ($1, $2, $3, NOW()::DATE)
        `, [productId, amount, price])
}