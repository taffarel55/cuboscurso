const express = require('express');
const {getAlunos,getAluno,postAluno,deleteAluno} = require('./controladores/alunos')

const roteador = express();

roteador.get('/alunos',getAlunos);
roteador.get('/alunos/:id',getAluno);
roteador.post('/alunos',postAluno);
roteador.delete('/alunos/:id',deleteAluno);

module.exports = roteador;