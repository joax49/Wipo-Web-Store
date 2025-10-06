import { pool } from "./main.js";
//Function for adding products into the database
export async function insertProduct(productName, productPrice, productType, productSubtype, productAmount, productImagePath) {
    await pool.query(`
        INSERT INTO products
        (name, price, type, subtype, amount, imagePath)
        VALUES ($1, $2, $3, $4, $5, $6)
        `, [productName, productPrice, productType, productSubtype, productAmount, productImagePath]);
}
//# sourceMappingURL=addProducts.js.map