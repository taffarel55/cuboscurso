const dados = require("../dados/bancodedados");
const { Erro } = require("./erros");

class Conta {
  constructor(usuario) {
    this.numero = (+new Date()).toString();
    this.saldo = 0;
    this.usuario = usuario;
  }
}

function listarContas(res) {
  res.status(200).json(dados.contas);
}

function encontrarConta(numeroConta, flag) {
  const conta = dados.contas.find((c) => c.numero == numeroConta);
  if (!conta && !flag)
    throw new Erro(404, "O número da conta não é válido ou não existe");
  return conta;
}

function adicionarConta(conta, res) {
  dados.contas.push(conta);
  res.status(201).json(conta);
}

function removerConta(conta, res) {
  if (conta.saldo !== 0) {
    res
      .status(400)
      .json({ erro: "Conta não pode ser removida, remova os fundos" });
    return;
  }

  const indice = dados.contas.indexOf(conta);
  dados.contas.splice(indice, 1);
  res.status(200).json(conta);
}

function conferirContas(num1, num2) {
  if (num1 !== num2) {
    throw new Erro(400, "O número da conta não confere");
  }
}

module.exports = {
  Conta,
  listarContas,
  encontrarConta,
  adicionarConta,
  conferirContas,
  removerConta,
};
