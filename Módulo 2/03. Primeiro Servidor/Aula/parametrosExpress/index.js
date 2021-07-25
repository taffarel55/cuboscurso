const express = require('express');

const app = express();

app.get('/livros/:numero',(req,res)=>{
    console.log(req.params.numero==='1');
    res.send('teste');
});

// app.get("/livros/1",(req,res)=>{
//     res.send("Livro 1");
// });

// app.get("/livros/2",(req,res)=>{
//     res.send("Livro 2");
// });

// app.get("/livros/3",(req,res)=>{
//     res.send("Livro 3");
// });

app.listen(8000)