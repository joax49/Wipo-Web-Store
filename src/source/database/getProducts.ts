import { pool } from "./main.js";

type Product = {
    name: string,
    price: number,
    type: string,
    section: string,
    isFavorite: boolean
}

export async function getProducts(): Promise<string[]> {
    const allProducts = await pool.query(`
        SELECT * FROM products_wipo
        `)

    return allProducts.rows
}

export async function insertProduct(newProduct:Product) {
    
}