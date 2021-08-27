const dados = require("../dados/bancodedados");
const { Erro } = require("./erros");

function validarUsuario(usuario) {
  ["nome", "cpf", "data_nascimento", "telefone", "email", "senha"].forEach(
    (atributo) => {
      if (!usuario.hasOwnProperty(atributo))
        throw new Erro(400, `O campo '${atributo}' é obrigatório`);
    }
  );
}

function verificarUnicidade(conta) {
  dados.contas.some((c) => {
    if (c.numero === conta.numero) return;
    ["cpf", "email"].forEach((atributo) => {
      if (c.usuario[atributo] === conta.usuario[atributo])
        throw new Erro(400, `Já existe uma conta com este ${atributo}`);
    });
  });
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
