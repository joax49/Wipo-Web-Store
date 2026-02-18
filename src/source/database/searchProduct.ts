import { pool } from "./main.js";
import { Product } from "./typeCasting.js";

//A function for searching a specific product by id
export async function searchProductById(productId: number): Promise<Product> {
    const products = await pool.query(`
        SELECT * FROM products WHERE id = $1
        `, [productId])

    return products.rows[0] as Product
}

//A function for searching a specific product by name
export async function searchProductByName(productName: string): Promise<Product> {
    const products = await pool.query(`
        SELECT * FROM products WHERE name = $1
        `, [productName])

    return products.rows[0] as Product
}