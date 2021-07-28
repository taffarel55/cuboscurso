const listaDeInstrutores = require("../dados/instrutores");

const areas = [
    'Lógica',
    'Back-end',
    'Full-stack',
    'Front-end',
    'Flutter',
    'Soft Skills',
    'UI/UX'
];

function consultarTodos(req,res) {
    res.json(listaDeInstrutores);
}

function consultarInstrutor(req,res) {
    const instrutor = listaDeInstrutores.find(x=>x.id==req.params.id);
    if(!instrutor) {
        res.status(404);
        res.json({erro:"Insrtutor "+req.params.id+" não existe."});
        return;
    }
    res.json(instrutor);
}

function validarInstrutor(instrutor) {
    if(!instrutor.nome)          return "O campo 'nome' é obrigatório";
    if(!instrutor.idade)         return "O campo 'idade' é obrigatório";
    if(!instrutor.areaDeAtuacao) return "O campo 'areaDeAtuacao' é obrigatória";

    if(typeof(instrutor.nome)!=='string')          return "O campo 'nome' deve ser preenchido com um texto";
    if(typeof(instrutor.idade)!=='number')         return "O campo 'idade' deve ser preenchido com um numero";
    if(typeof(instrutor.areaDeAtuacao)!=='string') return "O campo 'areaDeAtuacao' deve ser preenchido com um texto";
    if(instrutor.idade<18)                         return "O instrutor deve ser maior de idade";
    if(!areas.includes(instrutor.areaDeAtuacao))   return "Área de atuação informada é inválida";
    if(instrutor.length===0)                       return "O nome não pode estar vazio";
    if(!instrutor.nome.includes(' '))              return "O nome deverá ter primeiro nome e sobrenome";
}

function criarInstrutor(req,res) {
    const erro = validarInstrutor(req.body);
    
    if(erro) {
        res.status(400);
        res.json({ erro });
        return;
    }

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
    if(!instrutor) {
        res.status(404);
        res.json({erro:"Insrtutor "+req.params.id+" não existe."});
        return;
    }
    const erro = validarInstrutor({
        nome: req.body.nome ?? instrutor.nome,
        idade: req.body.idade ?? instrutor.idade,
        areaDeAtuacao: req.body.areaDeAtuacao ?? instrutor.areaDeAtuacao,
    });
    if(erro) {
        res.status(400);
        res.json({ erro });
        return;
    }
    if(req.body.nome !== undefined) instrutor.nome = req.body.nome; 
    if(req.body.idade !== undefined) instrutor.idade = req.body.idade; 
    if(req.body.areaDeAtuacao !== undefined) instrutor.areaDeAtuacao = req.body.areaDeAtuacao; 
    res.json(instrutor);
}

function substituirInstrutor(req, res) {
    const erro = validarInstrutor(req.body);
    if(erro) {
        res.status(400);
        res.json({ erro });
        return;
    }
    if(req.body.id!==Number(req.params.id)) {
        res.status(400);
        res.json({ erro: "O campo 'id' deve ser igual na rota e no corpo da requisição" });
        return;
    }
    const instrutor = listaDeInstrutores.find(x=>x.id==req.params.id);
    if (instrutor) {
        if(req.body.nome !== undefined) instrutor.nome = req.body.nome; 
        if(req.body.idade !== undefined) instrutor.idade = req.body.idade; 
        if(req.body.areaDeAtuacao !== undefined) instrutor.areaDeAtuacao = req.body.areaDeAtuacao;
        res.json(instrutor);
    } else {
        const novo = req.body;
        listaDeInstrutores.push(novo);
        res.json(novo);
    }
}

function deletarInstrutor(req,res) {
    const instrutor = listaDeInstrutores.find(x=>x.id==req.params.id);
    if(!instrutor) {
        res.status(404);
        res.json({erro:"Insrtutor "+req.params.id+" não existe."});
        return;
    }
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