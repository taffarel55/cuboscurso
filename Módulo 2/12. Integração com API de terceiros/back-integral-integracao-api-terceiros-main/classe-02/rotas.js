const express = require('express');
const {votar,verVotos} = require('./controladores/votacao');

rotas = express();

rotas.post('/votacao/:pais/:ip',votar);
rotas.get('/votacao',verVotos);

module.exports = rotas;