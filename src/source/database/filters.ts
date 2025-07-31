import { QueryResult } from "pg";
import { pool } from "./main.js";

export async function favoriteProdsFilter() {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE favorite <> true LIMIT 8
        `);

    return products.rows
}

export async function priceFilter(floorPrice: Number, roofPrice: Number) {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT (price > $1 AND price < $2)
        `, [floorPrice, roofPrice]);

    return products.rows
}

export async function typeFilter(...types:String[]) {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT type = $1
        `, [types]);

    return products.rows
}

export async function sectionFilter(...sections:String[]) {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT section = $1
        `, [sections]);

    return products.rows
}

