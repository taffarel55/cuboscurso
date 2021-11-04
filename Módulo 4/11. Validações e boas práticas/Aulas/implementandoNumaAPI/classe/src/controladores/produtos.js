const knex = require("../conexao");

const listarProdutos = async (req, res) => {
  const { usuario } = req;
  const { categoria } = req.query;

  try {
    const produtos = await knex("produtos")
      .where("usuario_id", usuario.id)
      .where("categoria", "ilike", `%${categoria}%`)
      .returning("*");

    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const obterProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const produto = await knex("produtos")
      .where({ id, usuario_id: usuario.id })
      .first()
      .debug()
      .returning("*");

    if (!produto) {
      return res.status(404).json("Produto não encontrado");
    }

    return res.status(200).json(produto);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarProduto = async (req, res) => {
  const { usuario } = req;
  const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

  if (!nome) {
    return res.status(404).json("O campo nome é obrigatório");
  }

  if (!estoque) {
    return res.status(404).json("O campo estoque é obrigatório");
  }

  if (!preco) {
    return res.status(404).json("O campo preco é obrigatório");
  }

  if (!descricao) {
    return res.status(404).json("O campo descricao é obrigatório");
  }

  try {
    const produto = await knex("produtos")
      .insert({
        nome,
        estoque,
        preco,
        categoria,
        descricao,
        imagem,
        usuario_id: usuario.id,
      })
      .returning("*");

    if (!produto) {
      return res.status(400).json("O produto não foi cadastrado");
    }

    return res.status(200).json("O produto foi cadastrado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;
  const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

  if (!nome && !estoque && !preco && !categoria && !descricao && !imagem) {
    return res
      .status(404)
      .json("Informe ao menos um campo para atualizaçao do produto");
  }

  try {
    const produto = await knex("produtos")
      .where({ id, usuario_id: usuario.id })
      .first()
      .returning("*");

    if (!produto) {
      return res.status(404).json("Produto não encontrado");
    }

    let obj = { nome, estoque, preco, categoria, descricao, imagem };
    Object.keys(obj).forEach((key) =>
      obj[key] === undefined ? delete obj[key] : {}
    );

    const produtoAtualizado = await knex("produtos")
      .update(obj)
      .where("id", produto.id);

    if (!produtoAtualizado) {
      return res.status(400).json("O produto não foi atualizado");
    }

    return res.status(200).json("produto foi atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const produto = await knex("produtos")
      .where({ id, usuario_id: usuario.id })
      .first()
      .returning("*");

    if (!produto) {
      return res.status(404).json("Produto não encontrado");
    }

    const produtoDeletado = await knex("produtos")
      .del()
      .where("id", id)
      .returning("*");

    if (!produtoDeletado[0]) {
      return res.status(404).json("Produto não pôde ser deletado");
    }
    return res.status(200).json("Produto excluido com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
};
