const jwt = require('jsonwebtoken');
const { pool } = require('../config/bd');

const verificarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: "Não autorizado" });
    }

    const token = authorization.split(" ")[1];

    try {
        const { id } = jwt.verify(token, '1234');

        const queryConsulta = `SELECT * FROM usuarios WHERE id = $1`;
        const parametroConsulta = [id];
        const resultadoConsulta = await pool.query(queryConsulta, parametroConsulta);

        if (resultadoConsulta.rowCount <= 0) {
            return res.status(401).json({ mensagem: "Não autorizado" });
        }

        const usuarioLogado = resultadoConsulta.rows[0];
        const { senha: _, ...dadosUsuarioLogado } = usuarioLogado;

        req.usuarioLogado = dadosUsuarioLogado;
        return next();

    } catch (error) {
        res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}

module.exports = {
    verificarLogin,
}