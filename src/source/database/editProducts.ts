import { pool } from "./main.js";

export async function reduceAmount(products:string[]) {
    for (let i = 0; i < products.length; i++) {
        await pool.query(`
        UPDATE products_wipo SET amount-1 WHERE name = $1
            `, [products[i]]);
    }
    
}