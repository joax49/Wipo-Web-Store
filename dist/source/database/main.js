import { Client } from 'pg';
const client = new Client({
    host: '127.0.0.1',
    user: 'postgres',
    port: 5000,
    password: 'tuki',
    database: 'wipo_db'
});
client.connect();
await client.query(`CREATE TABLE IF NOT EXISTS products_wipo (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    price INT,
    type VARCHAR(50),
    section VARCHAR(50),
    image BYTEA,
    favorite BOOLEAN
    )`);
//# sourceMappingURL=main.js.map