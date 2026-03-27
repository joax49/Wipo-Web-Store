import { pool } from "./main.js";
//Function for adding products into the database
export async function insertProduct(productName, productPrice, productType, productSubtype, productAmount, productImagePath, isOnline) {
    await pool.query(`
        INSERT INTO products
        (name, price, type, subtype, amount, imagePath, isOnline)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [productName, productPrice, productType, productSubtype, productAmount, productImagePath, isOnline]);
}
//# sourceMappingURL=addProducts.js.map