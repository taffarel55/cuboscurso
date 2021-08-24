const express = require('express');
const rotas = require('./rotas');
const autenticar = require("./intermediarios");

const app = express();

app.use(express.json());
app.use(autenticar);
app.use(rotas);

module.exports = app;