import { pool } from "./main.js";

export async function reduceAmount(products:string[]) {
    for (let i = 0; i < products.length; i++) {
        await pool.query(`
        UPDATE products SET amount-1 WHERE name = $1
            `, [products[i]]);
    }
    
}

export async function editData(id:number, name:string, price:number, type:string, subtype:string, amount:number) {
    await pool.query(`
        UPDATE products SET name = $1, price = $2, type = $3, subtype = $4, amount = $5
        WHERE id = $6
        `, [name, price, type, subtype, amount, id])
}