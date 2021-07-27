const express = require('express');
const app = express();

app.get('/somar', (req,res) => { 
    res.send((Number(req.query.num1)+Number(req.query.num2)).toString());
});

app.get('/subtrair', (req,res) => { 
    res.send((Number(req.query.num1)-Number(req.query.num2)).toString());
});

app.get('/multiplicar', (req,res) => { 
    res.send((Number(req.query.num1)*Number(req.query.num2)).toString());
});

app.get('/dividir', (req,res) => { 
    res.send((Number(req.query.num1)/Number(req.query.num2)).toString());
});

app.listen(8000,()=>{
    console.log('Ouvindo...');
});