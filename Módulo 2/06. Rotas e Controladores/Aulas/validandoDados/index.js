const express = require('express');
const roteador = require('./roteador');
const {logar,autenticar} = require('./intermediarios')

const app = express();

app.use(express.json());
app.use(logar);
app.use(autenticar);
app.use(roteador);

app.listen(8000,()=>{
    console.log('Servidor iniciado!');
});