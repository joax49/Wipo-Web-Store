import { pool } from "./main.js";

//Function for adding products into the database
export async function insertProduct(productName: string, productPrice: number, productType: (string | null),
productSubtype: (string | null), productAmount: number, productImagePath: (string | null), isOnline: boolean) {
    await pool.query(`
        INSERT INTO products
        (name, price, type, subtype, amount, imagePath, isOnline)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [productName, productPrice, productType, productSubtype, productAmount, productImagePath, isOnline])
}