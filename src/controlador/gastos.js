const { pool } = require("../config/bd");

const listarGastos = async (req, res) => {
    const { usuarioLogado } = req;

    try {
        const queryConsulta = "SELECT * FROM gastos WHERE id_usuario = $1";
        const parametroConsulta = [usuarioLogado.id];
        const { rows: gastos } = await pool.query(queryConsulta, parametroConsulta);
        res.status(200).json(gastos);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}

module.exports = {
    listarGastos,
}