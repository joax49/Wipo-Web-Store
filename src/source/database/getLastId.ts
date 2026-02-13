import { pool } from "./main.js";

export async function returnLastId(): Promise<number> {
    const item = await pool.query(`
        SELECT id FROM products
        ORDER BY id DESC LIMIT 1;
        `);

    return item.rows[0].id as number
}