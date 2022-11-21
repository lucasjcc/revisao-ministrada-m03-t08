const { pool } = require("../config/bd");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_PASSWORD } = require("../../credenciais");

const realizarLogin = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
    }

    try {
        const queryConsultarEmail = `SELECT * FROM usuarios WHERE email = $1`;
        const parametrosConsultaEmail = [email];
        const resultadoConsulta = await pool.query(queryConsultarEmail, parametrosConsultaEmail);

        if (resultadoConsulta.rowCount <= 0) {
            return res.status(400).json({ mensagem: "E-mail ou senha inválidos!" });
        }

        const usuarioEncontrado = resultadoConsulta.rows[0];
        const senhaConfere = await bcrypt.compare(senha, usuarioEncontrado.senha);

        if (!senhaConfere) {
            return res.status(400).json({ mensagem: "E-mail ou senha inválidos!" });
        }

        const token = jwt.sign({ id: usuarioEncontrado.id }, TOKEN_PASSWORD, { expiresIn: '1h' });

        const { senha: _, ...dadosUsuarioEncontrado } = usuarioEncontrado;

        return res.json({ ...dadosUsuarioEncontrado, token });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}

module.exports = {
    realizarLogin,
}