const conexao = require("../conexao");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../jwt_secret");

const listarAutores = async (req, res) => {
  try {
    const { rows: autores } = await conexao.query(
      "select * from autores order by id asc"
    );

    for (const autor of autores) {
      const { rows: livros } = await conexao.query(
        "select * from livros where autor_id = $1",
        [autor.id]
      );
      autor.livros = livros;
    }
    return res.status(200).json(autores);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const obterAutor = async (req, res) => {
  const { id } = req.params;
  try {
    const autor = await conexao.query("select * from autores where id = $1", [
      id,
    ]);
    if (autor.rowCount === 0)
      return res.status(404).json({ erro: "Autor não encontrado" });
    return res.status(200).json(autor.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarAutor = async (req, res) => {
  const { nome, idade, token } = req.body;
  if (!nome) return res.status(400).json({ erro: "Campo nome é obrigatório" });
  if (!token) return res.status(400).json({ erro: "Campo token é obrigatório" });

  try {
    const usuario = jwt.verify(token, jwtSecret);
    console.log(`${usuario.nome} está cadastrando um autor`);
  } catch {
    return res.status(400).json({ erro: "O token é inválido" });
  }

  try {
    const query = "insert into autores (nome, idade) values ($1, $2)";
    const autor = await conexao.query(query, [nome, idade]);
    if (autor.rowCount === 0) {
      return res
        .status(400)
        .json({ erro: "Não foi possível cadastrar o autor" });
    }
    return res.status(200).json({ mensagem: "Autor cadastrado com sucesso" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarAutor = async (req, res) => {
  const { id } = req.params;
  const { nome, idade } = req.body;
  try {
    const autor = await conexao.query("select * from autores where id = $1", [
      id,
    ]);
    if (autor.rowCount === 0)
      return res.status(404).json({ erro: "Autor não encontrado" });
    if (!nome)
      return res.status(400).json({ erro: "Campo nome é obrigatório" });
    const query = "update autores set nome=$1, idade=$2 where id=$3";
    const autorAtualizado = await conexao.query(query, [nome, idade, id]);
    if (autorAtualizado.rowCount === 0)
      return res
        .status(404)
        .json({ erro: "Não foi possível atualizar o autor" });
    return res.status(200).json({ mensagem: "Autor atualizado com sucesso" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deletarAutor = async (req, res) => {
  const { id } = req.params;
  try {
    const autor = await conexao.query("select * from autores where id = $1", [
      id,
    ]);
    if (autor.rowCount === 0)
      return res.status(404).json({ erro: "Autor não encontrado" });

    const query = "delete from autores where id=$1";
    const autorExcluido = await conexao.query(query, [id]);

    if (autorExcluido.rowCount === 0)
      return res.status(404).json({ erro: "Não foi possível excluir o autor" });

    return res.status(200).json({ mensagem: "Autor excluido com sucesso" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarAutores,
  obterAutor,
  cadastrarAutor,
  atualizarAutor,
  deletarAutor,
};
