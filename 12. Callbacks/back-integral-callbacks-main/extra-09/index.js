const pessoas = [
    {
        nome: 'Antonio',
        idade: 30,
        profissao: 'Jornalista'
    },
    {
        nome: 'Maria',
        idade: 30,
        profissao: 'Jornalista'
    },
    {
        nome: 'Ana',
        idade: 21,
        profissao: 'Programador'
    },
    {
        nome: 'Beatriz',
        idade: 20,
        profissao: 'Programador'
    },
    {
        nome: 'José',
        idade: 32,
        profissao: 'Jornalista'
    },
    {
        nome: 'Marcos',
        idade: 30,
        profissao: 'Programador'
    }
];

const progradores20Anos = pessoas.filter(p=>
    p.profissao==="Programador" && p.idade>20
);

const jornalista30Anos = pessoas.filter(p=>
    p.profissao==="Jornalista" && p.idade>30
);

const jovens = pessoas.filter(p=>p.idade<30);

console.log(progradores20Anos);
console.log(jornalista30Anos);
console.log(jovens);