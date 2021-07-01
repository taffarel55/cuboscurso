const prova = {
    aluno: "João",
    materia: "Português",
    valor: 10,
    questoes: [
        {
            resposta: "a",
            correta: "b"
        },
        {
            resposta: "c",
            correta: "c"
        },
        {
            resposta: "e",
            correta: "b"
        },
        {
            resposta: "b",
            correta: "b"
        },
        {
            resposta: "c",
            correta: "c"
        }
    ]
};

function corrigirProva(prova) {
    let s=0;
    for (let q of prova.questoes) {
        if(q["resposta"]==q["correta"]) s++; 
    }
    console.log(`O aluno(a) ${prova.nome} acertou ${s} questões e obteve nota ${prova.valor*s/(prova.questoes.length)}`)
}

corrigirProva(prova);