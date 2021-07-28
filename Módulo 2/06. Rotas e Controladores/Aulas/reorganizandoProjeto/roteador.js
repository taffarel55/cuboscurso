const express = require('express');
const controladores = require('./controladores/instrutores')

const roteador = express();

roteador.get('/instrutores', controladores.consultarTodos);
roteador.get('/instrutores/:id', controladores.consultarInstrutor);
roteador.post('/instrutores', controladores.criarInstrutor);
roteador.patch('/instrutores/:id', controladores.editarInstrutor);
roteador.put('/instrutores/:id',controladores.substituirInstrutor);
roteador.delete('/instrutores/:id', controladores.deletarInstrutor);

module.exports = roteador;