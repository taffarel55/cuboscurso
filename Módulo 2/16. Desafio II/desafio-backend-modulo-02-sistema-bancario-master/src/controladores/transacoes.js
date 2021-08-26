const { validarTransacao } = require("../funcoes/validacoes");
const { encontrarConta } = require("../funcoes/conta");
const {
  realizarDeposito,
  realizarSaque,
  realizarTransferencia,
  realizarAutenticacao,
} = require("../funcoes/operacoes");

function depositar(req, res) {
  const deposito = req.body;
  validarTransacao(deposito, "deposito");

  const conta = encontrarConta(deposito.numero_conta);
  realizarDeposito(conta, deposito);

  res.json({ mensagem: "Depósito realizado com sucesso!" });
}

function sacar(req, res) {
  const saque = req.body;
  validarTransacao(saque, "saque");

  const conta = encontrarConta(saque.numero_conta);
  realizarSaque(conta, saque);

  res.json({ mensagem: "Saque realizado com sucesso!" });
}

function transferir(req, res) {
  const transferencia = req.body;
  validarTransacao(transferencia, "transferencia");

  const contaOrigem = encontrarConta(transferencia.numero_conta_origem);
  const contaDestino = encontrarConta(transferencia.numero_conta_destino);

  realizarTransferencia(contaOrigem, contaDestino, transferencia);

  res.json({ mensagem: "Transferencia realizada com sucesso!" });
}

function saldo(req, res) {
  const { numero_conta, senha } = req.query;
  validarTransacao({ numero_conta, senha }, "saldo");

  const conta = encontrarConta(numero_conta);
  realizarAutenticacao(conta.usuario.senha, senha);

  res.json({ saldo: conta.saldo });
}

module.exports = {
  depositar,
  sacar,
  transferir,
  saldo,
};
