const express = require('express');
const app = express();

const jogadores = ["José", "Maria", "João", "Marcos", "Fernanda"];

let i = 0;

app.get('/', (req, res)=> {
    let nomeDoJogador = jogadores[i];
    res.send(`É a vez de ${nomeDoJogador} jogar!`);
    if(++i===jogadores.length) i=0;
});

app.get('/remover',(req,res)=>{
    let indice = req.query.indice;
    if (indice === undefined) {
        res.status(400);
        res.send('Bad Request');
        return;
    }
    if (indice < jogadores.length) {
        jogadores.splice(indice, 1);
        res.send(jogadores);
    } else {
        res.send(`Não existe jogador no índice informado (${indice}) para ser removido.`);
    }
});

app.get('/adicionar',(req, res)=>{
    let nome = req.query.nome;
    let indice = req.query.indice;
    if (nome === undefined) {
        res.status(400);
        res.send('Bad Request');
        return;
    }
    if (indice === undefined) {
        jogadores.push(format(nome));
        res.send(jogadores);
    } else {
        if (indice > jogadores.length) {
            res.send(`O índice informado (${indice}) não existe no array. Novo jogador não adicionado.`)
        } else {
            jogadores.splice(indice, 0, format(nome));
            res.send(jogadores);
        }
    }
});

app.listen(8000,()=>{
 console.log("Iniciando...");
});

function format(str) {
    return str[0].toUpperCase() + str.slice(1);
}