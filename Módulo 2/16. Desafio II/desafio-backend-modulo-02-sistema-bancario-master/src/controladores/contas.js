const {
  validarUsuario,
  verificarUnicidade,
  verificarVazio,
  verificarCompleto,
} = require("../funcoes/validacoes");

const {
  Conta,
  listarContas,
  encontrarConta,
  adicionarConta,
  conferirContas,
  removerConta,
} = require("../funcoes/conta");

function obterContas(req, res) {
  listarContas(res);
}

function criarConta(req, res) {
  const usuario = req.body;
  validarUsuario(usuario);

  const conta = new Conta(usuario);
  verificarUnicidade(conta);

  adicionarConta(conta, res);
}

function atualizarConta(req, res) {
  const usuario = req.body;
  verificarVazio(usuario);

  const { numeroConta } = req.params;
  const conta = encontrarConta(numeroConta);

  validarUsuario({...conta.usuario, ...usuario});
  verificarUnicidade({ numero: numeroConta, usuario });

  conta.usuario = { ...conta.usuario, ...usuario };
  res.json(conta.usuario);
}

function substituirConta(req, res) {
  const contaNova = req.body;
  verificarCompleto(contaNova);
  validarUsuario(contaNova.usuario);

  const { numeroConta } = req.params;
  conferirContas(contaNova.numero, numeroConta);

  const conta = encontrarConta(numeroConta, true);
  verificarUnicidade(contaNova);

  if (conta) {
    Object.assign(conta, contaNova);
    res.status(200).json(conta);
  } else {
    adicionarConta(contaNova,res)
  }
}

function deletarConta(req, res) {
  const { numeroConta } = req.params;
  const conta = encontrarConta(numeroConta);
  removerConta(conta, res);
}

module.exports = {
  obterContas,
  criarConta,
  atualizarConta,
  substituirConta,
  deletarConta,
};
