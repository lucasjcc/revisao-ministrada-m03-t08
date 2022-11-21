const { pool } = require("../config/bd");
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ menssagem: "Todos os campos são obrigatórios" });
    }

    try {
        const queryExisteEmail = `SELECT * FROM usuarios WHERE email = $1`;
        const parametrosExisteEmail = [email];
        const { rowCount: rowCountEmailExiste } = await pool.query(queryExisteEmail, parametrosExisteEmail);

        if (rowCountEmailExiste > 0) {
            return res.status(400).json({ menssagem: "E-mail ou senha inválidos" });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const queryCadastro = `
            INSERT INTO usuarios (nome,email,senha)
            VALUES ($1,$2,$3) returning *
        `;

        const parametrosCadastro = [nome, email, senhaCriptografada];

        const { rows, rowCount } = await pool.query(queryCadastro, parametrosCadastro);

        if (rowCount <= 0) {
            return res.status(500).json({ mensagem: "Erro interno do servido" });
        }

        const usuarioCadastrado = rows[0];

        const { senha: _, ...dadosUsuarioCadastrado } = usuarioCadastrado;

        return res.status(201).json(dadosUsuarioCadastrado);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}

module.exports = {
    cadastrarUsuario,
}