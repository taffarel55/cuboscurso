const conexao = require("../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const segredo = require('../segredo');

const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email)
    return res.status(403).json({ erro: "Campo email é obrigatório" });
  if (!senha)
    return res.status(403).json({ erro: "O campo senha é obrigatório" });

  try {
    const queryVerificarEmail = `select * from usuarios where email = $1`;
    const { rows, rowCount } = await conexao.query(queryVerificarEmail, [
      email,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    const usuario = rows[0];
    const senhaVerificada = await bcrypt.compare(senha, usuario.senha);

    if (!senhaVerificada) {
      return res.status(400).json({ erro: "Email e senha não confere." });
    }

    const token = jwt.sign({ id: usuario.id }, segredo, {
      expiresIn: "1d",
    });

    const { senha: senhaUsuario, ...dadosUsuario } = usuario;

    return res.status(200).json({
      dadosUsuario,
      token,
    });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

module.exports = { login };
