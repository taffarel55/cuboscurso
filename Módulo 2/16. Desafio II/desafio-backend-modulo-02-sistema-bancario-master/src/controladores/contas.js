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

// TODO: Ver se limpa mais
function atualizarConta(req, res) {
  const usuario = req.body;
  verificarVazio(usuario);

  const { numeroConta } = req.params;
  const conta = encontrarConta(numeroConta);

  validarUsuario({
    nome: conta.usuario.nome ?? usuario.nome,
    cpf: conta.usuario.cpf ?? usuario.cpf,
    data_nascimento: conta.usuario.data_nascimento ?? usuario.data_nascimento,
    telefone: conta.usuario.telefone ?? usuario.telefone,
    email: conta.usuario.email ?? usuario.email,
    senha: conta.usuario.senha ?? usuario.senha,
  });

  verificarUnicidade({ numero: numeroConta, usuario });

  if (usuario.nome !== undefined) conta.usuario.nome = usuario.nome;
  if (usuario.cpf !== undefined) conta.usuario.nome = usuario.cpf;
  if (usuario.data_nascimento !== undefined)
    conta.usuario.data_nascimento = usuario.data_nascimento;
  if (usuario.telefone !== undefined) conta.usuario.telefone = usuario.telefone;
  if (usuario.email !== undefined) conta.usuario.email = usuario.email;
  if (usuario.senha !== undefined) conta.usuario.senha = usuario.senha;

  res.json(conta);
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
