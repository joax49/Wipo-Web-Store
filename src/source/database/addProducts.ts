import { pool } from "./main.js";

//A type alias for setting the structure of all products
type Product = {
    name: string,
    price: number,
    type: string,
    section: string
}


export async function insertProduct(newProduct:(number | string)[]) {
    await pool.query(`
        INSERT INTO products_wipo
        (name, price)
        VALUES ($1, $2)
        `, [newProduct[0], newProduct[1]])
}