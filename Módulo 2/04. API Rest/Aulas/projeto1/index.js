const express = require('express');
const app = express();
app.use(express.json());

const listaDeInstrutores = [
    {
        id: 1,
        nome: 'Júnior',
        idade: 29,
        areaDeAtuacao: 'Logística'
    },
    {
        id: 2,
        nome: 'Dina',
        idade: 19,
        areaDeAtuacao: 'Back-end'
    },
    {
        id: 3,
        nome: 'Guido Cerqueira',
        idade: 30,
        areaDeAtuacao: 'Full-stack'
    },
    {
        id: 4,
        nome: 'Victor Magalhães',
        idade: 28,
        areaDeAtuacao: 'Front-end'
    },
];

app.get('/instrutores', (req, res) => {
    res.json(listaDeInstrutores);
});

app.post('/instrutores', (req, res)=>{
    const novo = {
        id: listaDeInstrutores.length+1,
        nome: req.body.nome,
        idade: req.body.idade,
        areaDeAtuacao: req.body.areaDeAtuacao
    }
    listaDeInstrutores.push(novo);
    res.json(novo);
});

app.get('/instrutores/:id', (req, res) => { 
    res.json(listaDeInstrutores.find(x=>x.id==req.params.id));
});

app.patch('/instrutores/:id',(req, res)=>{
    const instrutor = listaDeInstrutores.find(x=>x.id==req.params.id);
    if(req.body.nome !== undefined) instrutor.nome = req.body.nome; 
    if(req.body.idade !== undefined) instrutor.idade = req.body.idade; 
    if(req.body.areaDeAtuacao !== undefined) instrutor.areaDeAtuacao = req.body.areaDeAtuacao; 
    res.json(instrutor);
});

app.put('/instrutores/:id',(req, res)=>{
    const instrutor = listaDeInstrutores.find(x=>x.id==req.params.id);
    if (instrutor) {
        if(req.body.nome !== undefined) instrutor.nome = req.body.nome; 
        if(req.body.idade !== undefined) instrutor.idade = req.body.idade; 
        if(req.body.areaDeAtuacao !== undefined) instrutor.areaDeAtuacao = req.body.areaDeAtuacao;
        res.json(instrutor);
    } else {
        const novo = {
            id: req.body.id,
            nome: req.body.nome,
            idade: req.body.idade,
            areaDeAtuacao: req.body.areaDeAtuacao
        }
        listaDeInstrutores.push(novo);
        res.json(novo);
    }
});

app.delete('/instrutores/:id', (req, res) => { 
    const instrutor = listaDeInstrutores.find(x=>x.id==req.params.id);
    const indice = listaDeInstrutores.indexOf(instrutor);
    listaDeInstrutores.splice(indice,1);
    res.json(instrutor);
});

app.listen(8000,()=>{
    console.log('Servidor iniciado!');
});