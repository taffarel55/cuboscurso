const listaDeInstrutores = require("../dados/instrutores");

function consultarTodos(req,res) {
    res.json(listaDeInstrutores);
}

function consultarInstrutor(req,res) {
    res.json(listaDeInstrutores.find(x=>x.id==req.params.id));
}

function criarInstrutor(req,res) {
    const novo = {
        id: listaDeInstrutores.length+1,
        nome: req.body.nome,
        idade: req.body.idade,
        areaDeAtuacao: req.body.areaDeAtuacao
    }
    listaDeInstrutores.push(novo);
    res.json(novo);
}

function editarInstrutor(req, res) {
    const instrutor = listaDeInstrutores.find(x=>x.id==req.params.id);
    if(req.body.nome !== undefined) instrutor.nome = req.body.nome; 
    if(req.body.idade !== undefined) instrutor.idade = req.body.idade; 
    if(req.body.areaDeAtuacao !== undefined) instrutor.areaDeAtuacao = req.body.areaDeAtuacao; 
    res.json(instrutor);
}

function substituirInstrutor(req, res) {
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
}

function deletarInstrutor(req,res) {
    const instrutor = listaDeInstrutores.find(x=>x.id==req.params.id);
    const indice = listaDeInstrutores.indexOf(instrutor);
    listaDeInstrutores.splice(indice,1);
    res.json(instrutor);
}

module.exports = {
    consultarTodos,
    consultarInstrutor,
    criarInstrutor,
    editarInstrutor,
    substituirInstrutor,
    deletarInstrutor
};