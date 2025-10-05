import { pool } from "./main.js";
export async function reduceAmount(products) {
    for (let i = 0; i < products.length; i++) {
        await pool.query(`
        UPDATE products SET amount-1 WHERE name = $1
            `, [products[i]]);
    }
}
//# sourceMappingURL=editProducts.js.map