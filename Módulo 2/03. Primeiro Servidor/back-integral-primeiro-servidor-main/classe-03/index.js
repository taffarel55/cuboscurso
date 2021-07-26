const express = require('express');
const app = express();

const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];

let i = 0;

app.get('/', (req, res)=> {
    let nomeDoJogador = jogadores[i];
    res.send(`É a vez de ${nomeDoJogador} jogar!`);
    if(++i===jogadores.length) i=0;
});

app.listen(8000,()=>{
 console.log("Iniciando...");
});