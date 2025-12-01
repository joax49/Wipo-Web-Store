import { pool } from "./main.js";
import { Sale } from "./typeCasting.js";

export async function getSales(): Promise<Sale[]> {
    const sales = await pool.query(`
        SELECT sales.id, products.name, sales.amount, sales.price, sales.date FROM sales
        JOIN products ON sales.productId = products.id;
        `)

    return sales.rows as Sale[]
}