const express = require("express");

const app = express();

app.get('/',(req, res)=>{
    console.log('Recebi um GET /');
    res.send('Olá!');
});

app.get('/academy',(req, res)=>{
    console.log('Recebi um GET /');
    res.send('Meu primeiro servidor!');
});

app.listen(8000);