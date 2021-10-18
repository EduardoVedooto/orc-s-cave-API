import pg from "pg";

const { Pool } = pg;

console.log(`Ultilizando o banco de dados ${DB_DATABASE}`);

const connection = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE
});

export default connection;