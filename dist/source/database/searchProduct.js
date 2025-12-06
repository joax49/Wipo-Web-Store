import { pool } from "./main.js";
//A function for searching a specific product for the cart
export async function searchProduct(productId) {
    const products = await pool.query(`
        SELECT * FROM products WHERE id = $1
        `, [productId]);
    return products.rows[0];
}
//# sourceMappingURL=searchProduct.js.map