const conexao = require("../conexao");
const bcrypt = require("bcrypt");

const cadatrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome)
    return res.status(403).json({ erro: "O campo nome é obrigatório" });
  if (!email)
    return res.status(403).json({ erro: "Campo email é obrigatório" });
  if (!senha)
    return res.status(403).json({ erro: "O campo senha é obrigatório" });

  try {
    const queryConsultaEmail = `select * from usuarios where email = $1`;
    const { rowCount: qtd } = await conexao.query(queryConsultaEmail, [email]);
    if (qtd > 0) {
      return res.status(400).json({ erro: "O email informado já existe" });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const query = `insert into usuarios (nome, email, senha) values ($1, $2, $3)`;

    const usuarioCadastrado = await conexao.query(query, [
      nome,
      email,
      senhaCriptografada,
    ]);

    if (usuarioCadastrado.rowCount === 0) {
      return res
        .status(400)
        .json({ erro: "Não foi possível cadastrar o usuário" });
    }

    return res.status(200).json({ mensagem: "Usuário cadastrado!" });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
};

module.exports = { cadatrarUsuario };
