const { banco } = require("../dados/bancodedados");
const { Erro } = require("../funcoes/erros");

function autenticar(req, res, next) {
  const consultaSaldo =
    req.method === "GET" && req.url.split("/")[1] === "transacoes";
  const consultaExtrato =
    req.method === "GET" && req.url.split("/")[1] === "conta";
  const swagger = req.method === "GET" && req.url.split("/")[1] === "docs";
  if (
    req.query.senha_banco === banco.senha ||
    consultaSaldo ||
    consultaExtrato ||
    swagger
  ) {
    next();
  } else {
    res.status(401);
    res.json({ erro: "Senha incorreta" });
  }
}

function erros(err, req, res, next) {
  if (!err) err = new Erro();
  res.status(err.status).json({ erro: err.mensagem });
}

module.exports = { autenticar, erros };
