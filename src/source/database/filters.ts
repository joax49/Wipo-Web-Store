import { QueryResult } from "pg";
import { pool } from "./main.js";

//A function for filtering products by name
export async function nameFilter(productNames:string | string[]): Promise<string[]> {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT name = $1
        `, [productNames])

    return products.rows
}

//A function for filtering products by price
export async function priceFilter(floorPrice: number, roofPrice: number): Promise<string[]> {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT (price > $1 AND price < $2)
        `, [floorPrice, roofPrice]);

    return products.rows
}

//A function for filtering products by type
export async function typeFilter(types:string | string[]): Promise<string[]> {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT type = $1
        `, [types]);

    return products.rows
}

//A function for filtering products by sections
export async function sectionFilter(sections:string | string[]): Promise<string[]> {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT section = $1
        `, [sections]);

    return products.rows
}