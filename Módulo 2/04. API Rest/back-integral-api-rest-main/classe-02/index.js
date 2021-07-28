const express = require('express');
const app = express();
app.use(express.json());

let msg = {
    mensagem: ''
};

const livros = [
    {
        id: 1,
        titulo: "A Odisséia de Jonas",
        autor: "Thomas Crawling",
        ano: 2001,
        numPaginas: 197
    },
    {
        id: 2,
        titulo: "Jonas e a sociedade escondida",
        autor: "Claire Crawling",
        ano: 2004,
        numPaginas: 158
    }
];

app.get('/livros',(req,res)=>{
    res.json(livros);
});

app.get('/livros/:id',(req,res)=>{
    const index = Number(req.params.id);
    if (isNaN(index)) {
        msg.mensagem = "O valor do parâmetro ID da URL não é um número válido.";
        res.json(msg);
        return;
    } 
    const livro = livros.find(l=>l.id===index);
    if (livro===undefined) {
        msg.mensagem = "Não existe livro para o ID informado.";
        res.json(msg);
        return;
    } 
    res.json(livro);
});

app.post('/livros',(req,res)=>{
    const livro = req.body;
    const maxID = livros.reduce((acc, x) => acc.id > x.id ? acc.id : x.id);
    const novo = {
        id: maxID+1,
        titulo: livro.titulo,
        autor: livro.autor,
        ano: livro.ano,
        numPage: livro.numPage
    }
    livros.push(novo);
    res.json(novo);
});

app.put('/livros/:id',(req,res)=>{
    const index = Number(req.params.id);
    if (isNaN(index)) {
        msg.mensagem = "O valor do parâmetro ID da URL não é um número válido.";
        res.json(msg);
        return;
    }
    const livroNovo = {id: index,...req.body};
    const livro = livros.find(l=>l.id===index);
    if(livro) {
        const i = livros.indexOf(livro)
        livros.splice(i,1,livroNovo);
        msg.mensagem = "Livro substituído.";
    } else {
        msg.mensagem = "Não existe livro a ser substituído para o ID informado.";
    }
    res.json(msg);
});

app.patch('/livros/:id',(req,res)=>{
    const index = Number(req.params.id);
    if (isNaN(index)) {
        msg.mensagem = "O valor do parâmetro ID da URL não é um número válido.";
        res.json(msg);
        return;
    }
    const livroNovo = req.body;
    const livro = livros.find(l=>l.id===index);
    if(livro) {
        if(livroNovo.titulo) livro.titulo = livroNovo.titulo;
        if(livroNovo.autor) livro.autor = livroNovo.autor;
        if(livroNovo.ano) livro.ano = livroNovo.ano;
        if(livroNovo.numPage) livro.numPage = livroNovo.numPage;
        msg.mensagem = "Livro alterado.";
    } else {
        msg.mensagem = "Não existe livro a ser alterado para o ID informado.";
    }
    res.json(msg);
});

app.delete('/livros/:id',(req,res)=>{
    const index = Number(req.params.id);
    if (isNaN(index)) {
        msg.mensagem = "O valor do parâmetro ID da URL não é um número válido.";
        res.json(msg);
        return;
    }
    const livro = livros.find(l=>l.id===index);
    const i = livros.indexOf(livro);
    if(livro) { 
        livros.splice(i,1);
        msg.mensagem="Livro removido.";
    } else {
        msg.mensagem="Não existe livro a ser removido para o ID informado.";
    }
    res.json(msg);
});

app.listen(8000,()=>{
    console.log('Servidor iniciando!')
});