const express = require('express');
const {buscarCEP} = require('./controladores/enderecos');
const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.get('/enderecos/:cep', buscarCEP);

app.listen(port,()=>console.log('Servidor iniciado na porta '+port));