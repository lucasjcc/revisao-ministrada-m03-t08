const { Pool } = require("pg");
const { BD_USER, BD_HOST, BD_DATABASE, BD_PASSWORD, BD_PORT } = require("../../credenciais");

const pool = new Pool({
    user: BD_USER,
    host: BD_HOST,
    database: BD_DATABASE,
    password: BD_PASSWORD,
    port: BD_PORT
});

module.exports = {
    pool,
}