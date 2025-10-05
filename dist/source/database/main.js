import { Pool } from 'pg';
//Creating the pool
export const pool = new Pool({
    host: '127.0.0.1',
    user: 'postgres',
    port: 5432,
    password: 'Tuki4',
    database: 'wipo_db'
});
//Connecting to the pool
pool.connect();
//Creating a table for the products
await pool.query(`CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INT,
    type VARCHAR(50),
    subtype VARCHAR(50),
    amount SMALLINT,
    imagePath VARCHAR(100)
    )`);
//REMOVE: idByitemSecttion
//ADD: imagePath
//# sourceMappingURL=main.js.map