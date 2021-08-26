const dados = require("../dados/bancodedados");
const { Erro } = require("./erros");

function realizarDeposito(conta, deposito) {
  if (deposito.valor <= 0 || !Number.isInteger(deposito.valor))
    throw new Erro(400, "Valor do deposito deve ser inteiro e positivo");

  conta.saldo += deposito.valor;

  dados.depositos.push({ data: new Date().toLocaleString(), ...deposito });
}

function realizarSaque(conta, saque) {
  realizarAutenticacao(conta.usuario.senha, saque.senha);
  verificarSaldo(conta.saldo, saque.valor);
  conta.saldo -= saque.valor;
  dados.saques.push({ data: new Date().toLocaleString(), ...saque });
}

function verificarSaldo(saldo, valor) {
  if (saldo < valor) throw new Erro(400, "Não há este saldo disponível");
}

function realizarAutenticacao(senha1, senha2) {
  if (senha1 !== senha2)
    throw new Erro(400, "A senha da conta está incorreta!");
}

function realizarTransferencia(contaOrigem, contaDestino, transferencia) {
  realizarAutenticacao(contaOrigem.usuario.senha, transferencia.senha);
  verificarSaldo(contaOrigem.saldo, transferencia.valor);

  contaOrigem.saldo -= transferencia.valor;
  contaDestino.saldo += transferencia.valor;

  dados.transferencias.push({
    data: new Date().toLocaleString(),
    ...transferencia,
  });
}

function consultarExtrato(numero_conta) {
  const depositos = dados.depositos.filter(
    (d) => d.numero_conta === numero_conta
  );
  const saques = dados.saques.filter((d) => d.numero_conta === numero_conta);
  const transferenciasEnviadas = dados.transferencias.filter(
    (d) => d.numero_conta_origem === numero_conta
  );
  const transferenciasRecebidas = dados.transferencias.filter(
    (d) => d.numero_conta_destino === numero_conta
  );

  return {
    depositos,
    saques,
    transferenciasEnviadas,
    transferenciasRecebidas,
  };
}

module.exports = {
  realizarDeposito,
  realizarSaque,
  realizarTransferencia,
  realizarAutenticacao,
  consultarExtrato,
};
