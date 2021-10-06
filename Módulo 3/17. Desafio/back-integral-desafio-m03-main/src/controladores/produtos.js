const conexao = require("../conexao");
const { Erro } = require("../erro");

const listarProdutos = async (req, res, next) => {
  const { id } = res.locals.usuario;
  const { categoria } = req.query;

  try {
    const queryConsultaProdutos = categoria
      ? "select * from produtos where usuario_id = $1 and categoria = $2"
      : "select * from produtos where usuario_id = $1";

    const { rows } = await conexao.query(
      queryConsultaProdutos,
      categoria ? [id, categoria] : [id]
    );

    return res.status(200).json(rows);
  } catch (error) {
    return next(new Erro(400, error.message));
  }
};

const obterProduto = async (req, res, next) => {
  const { id } = res.locals.usuario;
  const { id: idProduto } = req.params;

  try {
    const queryBuscarProduto =
      "select * from produtos where id = $1 and usuario_id = $2";

    const { rows, rowCount } = await conexao.query(queryBuscarProduto, [
      idProduto,
      id,
    ]);

    if (rowCount === 0)
      return next(
        new Erro(404, `Não existe produto cadastrado com ID ${idProduto}`)
      );

    const produto = rows[0];

    return res.status(200).json(produto);
  } catch (error) {
    return next(new Erro(400, error.message));
  }
};

const cadastrar = async (req, res, next) => {
  const { id } = res.locals.usuario;
  const params = [
    "nome",
    "quantidade",
    "categoria",
    "preco",
    "descricao",
    "imagem",
  ];
  for (param of params) {
    if (!Object.keys(req.body).includes(param)) {
      return next(new Erro(400, `Parâmetro '${param}' é obrigatório`));
    }
  }

  const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;

  if (!quantidade > 0) {
    return next(new Erro(400, `Quantidade inválida para o produto`));
  }

  try {
    const { rowCount } = await conexao.query(
      `
        insert into produtos 
          (usuario_id, nome, quantidade, categoria, preco, descricao, imagem) 
        values 
          ($1, $2, $3, $4, $5, $6, $7)
      `,
      [id, nome, quantidade, categoria, preco, descricao, imagem]
    );
    if (rowCount > 0) {
      return res.status(204).json();
    }
  } catch (err) {
    return next(new Erro());
  }
};

const atualizar = async (req, res, next) => {
  const { id: usuario_id } = res.locals.usuario;
  const { id } = req.params;
  const { nome, quantidade, categoria, preco, descricao, imagem } = req.body;

  const params = ["nome", "quantidade", "preco", "descricao"];
  for (param of params) {
    if (!Object.keys(req.body).includes(param)) {
      return next(new Erro(400, `Parâmetro '${param}' é obrigatório`));
    }
  }

  try {
    const queryConsultaProduto =
      "select * from produtos where id = $1 and usuario_id = $2";

    const { rowCount } = await conexao.query(queryConsultaProduto, [
      id,
      usuario_id,
    ]);

    if (rowCount === 0)
      return next(
        new Erro(
          400,
          "Não foi possível atualizar o produto, verifique se o ID indicado está correto"
        )
      );

    const queryAtualizaProduto = `update produtos set
        nome= $1, quantidade = $2, categoria = $3, preco = $4, descricao = $5, imagem = $6
        where id = $7 and usuario_id = $8`;

    const { rowCount: r } = await conexao.query(queryAtualizaProduto, [
      nome,
      quantidade,
      categoria ?? null,
      preco,
      descricao,
      imagem ?? null,
      id,
      usuario_id,
    ]);

    if (r === 0) {
      return next(new Erro(400, "Não foi possível atualizar o produto"));
    }

    return res.status(201).json(req.body);
  } catch (error) {
    return next(new Erro(400, error.message));
  }
};

const deletar = async (req, res, next) => {
  const { id: usuario_id } = res.locals.usuario;
  const { id } = req.params;

  try {
    const queryExcluirProduto =
      "delete from produtos where id = $1 and usuario_id = $2";
    const { rowCount } = await conexao.query(queryExcluirProduto, [
      id,
      usuario_id,
    ]);

    if (rowCount === 0)
      return res.status(400).json({
        mensagem:
          "Não foi possível excluir o produto com o ID informado, verifique se o ID está correto",
      });

    return res.status(202).json();
  } catch (error) {
    return next(new Erro(400, error.message));
  }
};

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrar,
  atualizar,
  deletar,
};
