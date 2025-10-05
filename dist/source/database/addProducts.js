import { pool } from "./main.js";
//Function for adding products into the database
export async function insertProduct(productName, productPrice) {
    await pool.query(`
        INSERT INTO products
        (name, price)
        VALUES ($1, $2)
        `, [productName, productPrice]);
}
//# sourceMappingURL=addProducts.js.map