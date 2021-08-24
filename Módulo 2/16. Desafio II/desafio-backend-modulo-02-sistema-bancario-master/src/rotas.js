const express = require("express");
const {
  obterContas,
  criarConta,
  atualizarConta,
  substituirConta,
  deletarConta,
} = require("./controladores/contas");

const rotas = express();

rotas.get("/contas", obterContas);
rotas.post("/contas", criarConta);
rotas.patch("/contas/:numeroConta/usuario", atualizarConta);
rotas.put("/contas/:numeroConta/usuario", substituirConta);
rotas.delete("/contas/:numeroConta", deletarConta);

module.exports = rotas;
