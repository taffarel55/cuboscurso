const express = require('express');
const app = express();

let minutos=0;
let segundos=0;

let intervalID=undefined;

app.get('/', (req, res)=>{
    res.send(`Tempo atual do cronômetro: ${pad(minutos)}:${pad(segundos)}`)
});

app.get('/iniciar',(req, res)=> {
    if (intervalID === undefined) {
        intervalID = setInterval(contagem, 1000);
        res.send('Cronômetro iniciado!');
    }
    else {
        res.send('Cronômetro já está inciado!');
    }
});

app.get('/pausar',(req, res)=> {
    clearInterval(intervalID);
    res.send('Cronômetro pausado!');
});

app.get('/continuar',(req, res)=> {
    if (intervalID === undefined) {
        res.send('Cronômetro não foi iniciado!');
    } else {
        clearInterval(intervalID);
        intervalID = setInterval(contagem, 1000);
        res.send('Cronômetro continuando!');
    }
});

app.get('/zerar',(req,res)=>{
    minutos=0;
    segundos=0;
    res.send('Cronômetro zerado!');
});

app.listen(8000,()=>{
    console.log('Servidor iniciado');
});

function pad(num) {
    let s = num+"";
    while (s.length < 2) s = "0" + s;
    return s;
}

function contagem() {
    if(segundos++===60) {
        segundos=0;
        minutos++;
    }
}