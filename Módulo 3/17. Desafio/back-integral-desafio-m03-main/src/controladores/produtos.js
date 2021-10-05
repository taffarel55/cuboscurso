const conexao = require("../conexao");
const { Erro } = require("../erro");

const listarProdutos = async (req, res, next) => {
  res.send("Listar produtos");
};

const obterProduto = async (req, res, next) => {
  res.send("Obter produto");
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

  res.send("Cadastrar produto");
};

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrar,
};
