import { pool } from "./main.js";
// export async function favoriteProdsFilter() {
//     const products = await pool.query(`
//         SELECT * FROM products_wipo WHERE favorite = true LIMIT 8
//         `);
//     return products.rows
// }
//A function for filtering products by name
export async function nameFilter(productNames) {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT name = $1
        `, [productNames]);
    return products.rows;
}
//A function for filtering products by price
export async function priceFilter(floorPrice, roofPrice) {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT (price > $1 AND price < $2)
        `, [floorPrice, roofPrice]);
    return products.rows;
}
//A function for filtering products by type
export async function typeFilter(types) {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT type = $1
        `, [types]);
    return products.rows;
}
//A function for filtering products by sections
export async function sectionFilter(sections) {
    const products = await pool.query(`
        SELECT * FROM products_wipo WHERE NOT section = $1
        `, [sections]);
    return products.rows;
}
//# sourceMappingURL=filters.js.map