import { pool } from "./main.js";
//A function for searching a specific product by id
export async function searchProductById(productId) {
    const products = await pool.query(`
        SELECT * FROM products WHERE id = $1
        `, [productId]);
    return products.rows[0];
}
//A function for searching a specific product by name
export async function searchProductByName(productName) {
    const products = await pool.query(`
        SELECT * FROM products WHERE name = $1
        `, [productName]);
    return products.rows[0];
}
//# sourceMappingURL=searchProduct.js.map