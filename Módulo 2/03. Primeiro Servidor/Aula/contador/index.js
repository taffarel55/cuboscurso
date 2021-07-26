const express = require('express');
const app = express();

let contador = 0;

app.get('/contador',(req, res)=> {
    contador++;
    res.send(`Você já abriu essa página ${contador} vez${contador===1?'':'es'}`);
});

app.get('/zerar',(req, res)=> {
    contador=0;
    res.send(`Zerei`);
});

app.get('/atribuir',(req, res)=> {
    if (req.query.valor===undefined) {
        res.status(400);
        res.send('Você cometeu um erro');
    } else {
        contador = Number(req.query.valor);
        res.send('Valor atribuído');
    }
});

app.listen(8000);