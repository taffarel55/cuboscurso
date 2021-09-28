const jwt = require("jsonwebtoken");
const segredo = require("../segredo");
const conexao = require("../conexao");

const cadastrarPostagem = async (req, res) => {
  const { texto } = req.body;
  const { usuario } = req;

  if (!texto) {
    return res.status(403).json({ erro: "O campo texto é obrigatório" });
  }

  try {
    const postagem = await conexao.query(
      "insert into postagens (usuario_id, texto) values ($1, $2)",
      [usuario.id, texto]
    );

    if (postagem.rowCount === 0) {
      return res
        .status(404)
        .json({ erro: "Não foi possível cadastrar a postagem" });
    }

    return res.status(201).json({ mensagem: "Postagem  com sucesso" });
  } catch (err) {
    
    return res.status(400).json({ erro: err.message });
  }
};

const atualizarPostagem = async (req, res) => {
  const { texto } = req.body;
  const { usuario } = req;
  const { id: idPostagem } = req.params;

  if (!texto) {
    return res.status(403).json({ erro: "O campo texto é obrigatório" });
  }

  try {

    const queryPostagemExistente = `select * from postagens where id = $1 and usuario_id=$2`;
    const postagemExistente = conexao.query(queryPostagemExistente, [
      idPostagem,
      usuario.id,
    ]);
    if (postagemExistente.rowCount === 0) {
      return res.status(404).json({ erro: "A postagem não foi encontrada" });
    }

    const postagem = await conexao.query(
      "update postagens set texto=$1 where id=$2 and usuario_id=$3",
      [texto, idPostagem, usuario.id]
    );

    if (postagem.rowCount === 0) {
      return res
        .status(404)
        .json({ erro: "Não foi possível atualizar a postagem" });
    }

    return res
      .status(201)
      .json({ mensagem: "Postagem atualizada com sucesso" });
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
};

module.exports = { cadastrarPostagem, atualizarPostagem };
