const express = require('express');
const { listarGastos } = require('./controlador/gastos');
const { realizarLogin } = require('./controlador/login');
const { cadastrarUsuario } = require('./controlador/usuarios');
const { verificarLogin } = require('./intermediarios/login');
const rotas = express();

rotas.post('/usuarios', cadastrarUsuario);
rotas.post('/login', realizarLogin);

rotas.use(verificarLogin);

rotas.get('/gastos', listarGastos);


module.exports = {
    rotas,
}
