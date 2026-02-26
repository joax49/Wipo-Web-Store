import { pool } from "./main.js";

export async function editPrices(oldFloorPrice:number, oldRoofPrice:number, newPrice:number, type:string | null) {
    if(typeof type === "string") {
        await pool.query(`
        UPDATE products SET price = $1
        WHERE price > $2 AND price < $3 AND type ILIKE $4
        `, [newPrice, oldFloorPrice, oldRoofPrice, type])
    }

    else {
        await pool.query(`
        UPDATE products SET price = $1
        WHERE price >= $2 AND price <= $3
        `, [newPrice, oldFloorPrice, oldRoofPrice])
    }
}