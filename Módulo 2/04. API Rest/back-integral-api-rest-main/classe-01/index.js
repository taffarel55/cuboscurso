const express = require('express');
const app = express();
app.use(express.json());

let convidados = ["Carlos", "Amanda", "Fernanda", "Juliana", "Lucas", "Roberto"];
let msg = {
    mensagem: ""
}

app.get('/convidados',(req,res)=>{
    if(req.query.nome !== undefined) {
        if (convidados.indexOf(req.query.nome)!==-1) {
            msg.mensagem = "Convidado presente.";
        } else {
            msg.mensagem = "O convidado buscado não está presente na lista.";
        }
        res.send(msg);
    } else {
        res.json(convidados);
    }
});

app.post('/convidados',(req, res)=>{
    if(req.body.nome===undefined) {
        res.status(400);
        res.send('Opção inválida');
        return;
    } 
    if (convidados.indexOf(req.body.nome)!==-1) {
        msg.mensagem = "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também.";
    } else {
        convidados.push(req.body.nome)
        console.log('Convidado adicionado!')
        console.log(convidados)
        msg.mensagem = "Convidado adicionado.";
    }
    res.json(msg);
});

app.delete('/convidados/:nome',(req,res)=>{
    const index = convidados.indexOf(req.params.nome);
    if (index!==-1) {
        convidados.splice(index,1);
        msg.mensagem = "Convidado removido.";
        console.log(convidados)
    } else {
        msg.mensagem = "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido.";
    }
    res.json(msg);
});

app.listen(8000,()=>{
    console.log('Servidor iniciado!');
});