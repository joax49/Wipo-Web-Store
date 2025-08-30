import { pool } from "./main.js";
export async function insertProduct(newProduct) {
    await pool.query(`
        INSERT INTO products_wipo
        (name, price)
        VALUES ($1, $2)
        `, [newProduct[0], newProduct[1]]);
}
//# sourceMappingURL=addProducts.js.map