const conexao = require("../conexao");

const listarLivros = async (req, res) => {
  try {
    const query = `
      select l.id, l.nome, a.nome as nome_autor, l.genero, l.editora, l.data_publicacao 
      from livros l 
      left join autores a 
      on l.autor_id = a.id
      order by id asc
    `;
    const { rows: livros } = await conexao.query(query);
    return res.status(200).json(livros);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const obterLivro = async (req, res) => {
  const { id } = req.params;
  try {
    const livro = await conexao.query("select * from livros where id = $1", [
      id,
    ]);
    if (livro.rowCount === 0)
      return res.status(404).json({ erro: "Livro não encontrado" });
    return res.status(200).json(livro.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarLivro = async (req, res) => {
  const { autor_id, nome, editora, genero, data_publicacao } = req.body;
  try {
    if (!autor_id || !nome || !genero)
      return res.status(400).json({ erro: "Há campos obrigatórios restantes" });
    const autor = await conexao.query("select * from autores where id = $1", [
      autor_id,
    ]);
    if (autor.rowCount === 0)
      return res.status(404).json({ erro: "Autor não encontrado" });
    const query =
      "insert into livros (autor_id, nome, editora, genero, data_publicacao) values ($1, $2, $3, $4, $5)";
    const livro = await conexao.query(query, [
      autor_id,
      nome,
      editora,
      genero,
      data_publicacao,
    ]);
    if (livro.rowCount === 0) {
      return res
        .status(400)
        .json({ erro: "Não foi possível cadastrar o livro" });
    }
    return res.status(200).json({ mensagem: "Livro cadastrado com sucesso" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarLivro = async (req, res) => {
  const { autor_id, nome, editora, genero, data_publicacao } = req.body;
  const { id } = req.params;
  try {
    if (req.body.length === 0)
      return res.status(400).json({ erro: "Corpo da requisição vazia" });
    const autor = await conexao.query("select * from autores where id = $1", [
      autor_id,
    ]);
    if (autor.rowCount === 0)
      return res.status(404).json({ erro: "Livro não encontrado" });
    const query =
      "update livros set autor_id=$1, nome=$2, editora=$3, genero=$4, data_publicacao=$5 where id=$6";
    const livro = await conexao.query(query, [
      autor_id,
      nome,
      editora,
      genero,
      data_publicacao,
      id,
    ]);
    if (livro.rowCount === 0) {
      return res
        .status(400)
        .json({ erro: "Não foi possível atualizar o autor" });
    }
    return res.status(200).json({ mensagem: "Livro cadastrado com sucesso" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deletarLivro = async (req, res) => {
  const { id } = req.params;
  try {
    const livro = await conexao.query("select * from livros where id = $1", [
      id,
    ]);
    if (livro.rowCount === 0)
      return res.status(404).json({ erro: "Livro não encontrado" });

    const query = "delete from livros where id=$1";
    const livroExcluido = await conexao.query(query, [id]);

    if (livroExcluido.rowCount === 0)
      return res.status(404).json({ erro: "Não foi possível excluir o livro" });

    return res.status(200).json({ mensagem: "Livro excluido com sucesso" });

    return res.status(200).json(livro.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarLivros,
  obterLivro,
  cadastrarLivro,
  atualizarLivro,
  deletarLivro,
};
