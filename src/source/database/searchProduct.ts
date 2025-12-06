import { pool } from "./main.js";
import { Product } from "./typeCasting.js";

//A function for searching a specific product for the cart
export async function searchProduct(productId: number): Promise<Product> {
    const products = await pool.query(`
        SELECT * FROM products WHERE id = $1
        `, [productId])

    return products.rows[0] as Product
}