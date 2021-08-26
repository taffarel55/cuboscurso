const express = require("express");
const rotas = require("../rotas/rotas");
const {autenticar, erros} = require("../intermediarios/intermediarios");

const app = express();

app.use(express.json());
app.use(autenticar);
app.use(rotas);
app.use(erros);

module.exports = app;
