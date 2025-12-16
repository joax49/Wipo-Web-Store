import { pool } from "./main.js";
import { Product } from "./typeCasting.js";

export async function isExistingProduct(productName:string): Promise<boolean> {
    try {
        const result = await pool.query(`SELECT * FROM products`)

        return result.rows.some(
            (product: Product) => 
                product.name.toLowerCase() === productName.toLowerCase()
        );
    } catch(err) {
        throw new Error("Couldn't check the product");
    }
}