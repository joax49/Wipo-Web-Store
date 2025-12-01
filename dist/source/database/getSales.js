import { pool } from "./main.js";
export async function getSales() {
    const sales = await pool.query(`
        SELECT sales.id, products.name, sales.amount, sales.price, sales.date FROM sales
        JOIN products ON sales.productId = products.id;
        `);
    return sales.rows;
}
//# sourceMappingURL=getSales.js.map