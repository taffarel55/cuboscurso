const dados = require("../dados/bancodedados");
const { Erro } = require("./erros");

function validarUsuario(usuario) {
  let mensagem;
  if (!usuario.nome) mensagem = "O campo 'nome' é obrigatório";
  if (!usuario.cpf) mensagem = "O campo 'cpf' é obrigatório";
  if (!usuario.data_nascimento)
    mensagem = "O campo 'data_nascimento' é obrigatório";
  if (!usuario.telefone) mensagem = "O campo 'telefone' é obrigatório";
  if (!usuario.email) mensagem = "O campo 'email' é obrigatório";
  if (!usuario.senha) mensagem = "O campo 'senha' é obrigatório";

  if (mensagem) throw new Erro(400, mensagem);
}

function verificarUnicidade(conta) {
  let mensagem;
  if (
    dados.contas.some(
      (c) => c.usuario.cpf === conta.usuario.cpf && c.numero !== conta.numero
    )
  )
    mensagem = "Já existe uma conta com este CPF";

  if (
    dados.contas.some(
      (c) =>
        c.usuario.email === conta.usuario.email && c.numero !== conta.numero
    )
  )
    mensagem = "Já existe este email cadastrado em uma conta";

  if (mensagem) throw new Erro(400, mensagem);
}

function validarTransacao(transacao, tipo) {
  let mensagem;
  if (tipo !== "saldo" && !transacao.valor)
    mensagem = "Valor da transação não informado";
  if (tipo !== "transferencia" && !transacao.numero_conta)
    mensagem = "Número da conta não informado";
  if (tipo !== "deposito" && !transacao.senha) return "Senha não informada";
  if (
    tipo === "transferencia" &&
    (!transacao.numero_conta_origem || !transacao.numero_conta_destino)
  )
    mensagem = "Informe conta de origem e conta de destino";

  if (mensagem) throw new Erro(400, mensagem);
}

function verificarVazio(usuario) {
  if (!Object.keys(usuario).length)
    throw new Erro(400, "O corpo da requisição está vazio");
}

function verificarCompleto(conta) {
  const prms = Object.keys(conta);
  if (
    !prms.includes("numero") ||
    !prms.includes("saldo") ||
    !prms.includes("usuario")
  )
    throw new Erro(400, "O corpo da requisição não está completo");
}

module.exports = {
  dados,
  validarUsuario,
  verificarUnicidade,
  validarTransacao,
  verificarVazio,
  verificarCompleto,
};
