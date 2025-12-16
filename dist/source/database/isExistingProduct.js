import { pool } from "./main.js";
export async function isExistingProduct(productName) {
    try {
        const result = await pool.query(`SELECT * FROM products`);
        return result.rows.some((product) => product.name.toLowerCase() === productName.toLowerCase());
    }
    catch (err) {
        throw new Error("Couldn't check the product");
    }
}
//# sourceMappingURL=isExistingProduct.js.map