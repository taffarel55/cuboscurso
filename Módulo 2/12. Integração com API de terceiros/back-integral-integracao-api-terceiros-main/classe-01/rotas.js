const express = require('express');
const empresas = require('./controladores/empresas');
const rotas = express();

rotas.get('/empresas/:dominioEmpresa',empresas.consultar);

module.exports = rotas;