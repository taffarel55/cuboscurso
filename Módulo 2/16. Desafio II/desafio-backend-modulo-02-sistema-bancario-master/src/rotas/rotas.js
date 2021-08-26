const express = require("express");

const {
  obterContas,
  criarConta,
  atualizarConta,
  substituirConta,
  deletarConta,
} = require("../controladores/contas");

const {
  depositar,
  sacar,
  transferir,
  saldo,
} = require("../controladores/transacoes");

const {
  extrato,
} = require("../controladores/conta");

const rotas = express();

rotas.get("/contas", obterContas);
rotas.post("/contas", criarConta);
rotas.patch("/contas/:numeroConta/usuario", atualizarConta);
rotas.put("/contas/:numeroConta/usuario", substituirConta);
rotas.delete("/contas/:numeroConta", deletarConta);

rotas.post("/transacoes/depositar", depositar);
rotas.post("/transacoes/sacar", sacar);
rotas.post("/transacoes/transferir", transferir);
rotas.get("/transacoes/saldo", saldo);

rotas.get('/conta/extrato', extrato);

module.exports = rotas;
