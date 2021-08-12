const alunos = require('../dados/alunos');
const cursos = require('../dados/cursos');

function getAlunos(req, res) {
    res.send(alunos);
}

function getAluno(req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400);
        res.json({mensagem:"O ID deve ser um número válido"});
        return;
    }
    const aluno = alunos.find(x=>x.id === id);
    if(!aluno) {
        res.status(404);
        res.json({mensagem:"Aluno "+id+" não existe."});
        return;
    }
    res.json(aluno);
}

function postAluno(req, res) {
    const mensagem = validarReq(req.body);
    if (mensagem) {
        res.status(400);
        res.send({mensagem});
    }
    const id = alunos.length?alunos.reduce((acc,x)=>{
        return x>acc?acc:x;
    }).id+1:1;
    alunos.push({
        id,
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        idade: req.body.idade,
        curso: req.body.curso
    });
    res.status(201);
    res.send();
    return;
}

function deleteAluno(req,res) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400);
        res.json({mensagem:"O ID deve ser um número válido"});
        return;
    }
    let aluno = alunos.find(x=>x.id === id);
    if(!aluno) {
        res.status(404);
        res.json({mensagem:"Aluno "+id+" não existe."});
        return;
    }
    const indice = alunos.indexOf(aluno);
    alunos.splice(indice,1);
    res.status(202);
    res.json(aluno);
}

function editarAluno(req, res) {
    const aluno = alunos.find(x=>x.id==req.params.id);
    if(!aluno) {
        res.status(404);
        res.json({erro:"Aluno "+req.params.id+" não existe."});
        return;
    }
    const mensagem = validarReq({
        nome: req.body.nome ?? aluno.nome,
        sobrenome: req.body.sobrenome ?? aluno.sobrenome,
        idade: req.body.idade ?? aluno.idade,
        curso: req.body.curso ?? aluno.curso,
    });
    if(mensagem) {
        res.status(400);
        res.json({ mensagem });
        return;
    }
    if(req.body.nome !== undefined) aluno.nome = req.body.nome; 
    if(req.body.sobrenome !== undefined) aluno.nome = req.body.sobrenomenome; 
    if(req.body.idade !== undefined) aluno.idade = req.body.idade; 
    if(req.body.curso !== undefined) aluno.curso = req.body.curso; 
    res.json(aluno);
}

function substituirAluno(req, res) {
    const mensagem = validarReq(req.body);
    if(mensagem) {
        res.status(400);
        res.json({ mensagem });
        return;
    }
    if(req.body.id!==Number(req.params.id)) {
        res.status(400);
        res.json({ erro: "O campo 'id' deve ser igual na rota e no corpo da requisição" });
        return;
    }
    const aluno = alunos.find(x=>x.id==req.params.id);
    if (aluno) {
        if(req.body.nome !== undefined) aluno.nome = req.body.nome; 
        if(req.body.sobrenome !== undefined) aluno.nome = req.body.sobrenomenome; 
        if(req.body.idade !== undefined) aluno.idade = req.body.idade; 
        if(req.body.curso !== undefined) aluno.curso = req.body.curso; 
        res.json(aluno);
    } else {
        const novo = req.body;
        alunos.push(novo);
        res.status(201);
        res.json(novo);
    }
}

function validarReq(aluno) {
    if (!aluno.nome.trim())      return "Nome não especificado";
    if (!aluno.sobrenome.trim()) return "Sobrenome não especificado";
    if (!aluno.idade)            return "Idade não especificada";
    if (!aluno.curso.trim())     return "Curso não especificado";
    if (aluno.idade<18)          return "Aluno não pode ser menor de idade";

    if (cursos.indexOf(aluno.curso)===-1) return "O curso não é válido";
}

module.exports = {
    getAlunos,
    getAluno,
    postAluno,
    deleteAluno,
    editarAluno,
    substituirAluno
}