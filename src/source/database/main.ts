import {Client} from 'pg'

const client = new Client({
    host : '127.0.0.1',
    user : 'postgres',
    port : 5000,
    password : 'tuki',
    database : 'wipo_db'
})

client.connect()