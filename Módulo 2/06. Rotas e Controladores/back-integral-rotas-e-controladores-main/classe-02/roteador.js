const express = require('express');
const {
    getAlunos,
    getAluno,
    postAluno,
    deleteAluno,
    editarAluno,
    substituirAluno
} = require('./controladores/alunos')

const roteador = express();

roteador.get('/alunos',getAlunos);
roteador.get('/alunos/:id',getAluno);
roteador.post('/alunos',postAluno);
roteador.delete('/alunos/:id',deleteAluno);
roteador.patch('/alunos/:id',editarAluno);
roteador.put('/alunos/:id',substituirAluno);

module.exports = roteador;