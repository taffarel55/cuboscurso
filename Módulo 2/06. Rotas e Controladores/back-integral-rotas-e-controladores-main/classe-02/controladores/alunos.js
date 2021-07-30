const alunos = require('../dados/alunos')

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
    res.json(aluno);
}

module.exports = {
    getAlunos,
    getAluno,
    postAluno,
    deleteAluno
}

function validarReq(aluno) {
    if (!aluno.nome.trim())      return "Nome não especificado";
    if (!aluno.sobrenome.trim()) return "Sobrenome não especificado";
    if (!aluno.idade)            return "Idade não especificada";
    if (!aluno.curso.trim())     return "Curso não especificado";
    if (aluno.idade<18)          return "Aluno não pode ser menor de idade";
}