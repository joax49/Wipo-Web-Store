import { pool, Product } from "./main.js";

//A function for searching a specific product for the cart
export async function searchProduct(productName: string): Promise<Product> {
    const products = await pool.query(`
        SELECT * FROM products WHERE name = $1
        `, [productName.toLowerCase()])

    return products.rows[0]
}