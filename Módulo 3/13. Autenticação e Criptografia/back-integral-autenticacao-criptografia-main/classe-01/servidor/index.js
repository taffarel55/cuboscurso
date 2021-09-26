const express = require("express");
const rotas = require("../rotas");
const { Erro } = require("../erro");
const { autenticar } = require("../intermediarios");
const app = express();

app.use(express.json());
app.use(autenticar);
app.use(rotas);
app.use((err, req, res, next) => {
  if (!err) err = new Erro();
  res.status(err.status).json({ erro: err.mensagem });
});

module.exports = app;
