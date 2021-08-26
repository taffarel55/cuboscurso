const { validarTransacao } = require("../funcoes/validacoes");
const { encontrarConta } = require("../funcoes/conta");
const { realizarAutenticacao, consultarExtrato } = require("../funcoes/operacoes");

function extrato(req, res) {
  const { numero_conta, senha } = req.query;
  validarTransacao({ numero_conta, senha }, "saldo");

  const conta = encontrarConta(numero_conta);
  realizarAutenticacao(conta.usuario.senha, senha);

  res.status(200).json(consultarExtrato(numero_conta));
}

module.exports = {
  extrato,
};
