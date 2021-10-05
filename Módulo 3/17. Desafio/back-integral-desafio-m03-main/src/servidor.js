const express = require("express");
const rotas = require("./rotas");
const { autenticar, errosAutenticacao, errosRotas } = require("./intermediarios");

const app = express();

app.use(express.json());
app.use(autenticar);
app.use(errosAutenticacao);
app.use(rotas);
app.use(errosRotas);

module.exports = app;
