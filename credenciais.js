/* Coloque esse arquivo no .gitignore, que é para quem
acessar seu projeto no github não ter acesso */

const BD_USER = 'postgres';
const BD_HOST = 'localhost';
const BD_DATABASE = 'revisao03';
const BD_PASSWORD = 'lucas123';
const BD_PORT = 5432;
const TOKEN_PASSWORD = 'senhatoken';


module.exports = {
    BD_USER,
    BD_HOST,
    BD_DATABASE,
    BD_PASSWORD,
    BD_PORT,
    TOKEN_PASSWORD,
}