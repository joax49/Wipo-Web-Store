import { pool } from "./main.js";
export async function insertProduct(productName, productPrice) {
    await pool.query(`
        INSERT INTO products_wipo
        (name, price)
        VALUES ($1, $2)
        `, [productName, productPrice]);
}
//# sourceMappingURL=addProducts.js.map