const pessoas = [
    {
        nome: 'José',
        idade: 30,
        altura: 173
    },
    {
        nome: 'Pedro',
        idade: 15,
        altura: 160
    },
    {
        nome: 'Lucas',
        idade: 25,
        altura: 194
    }
];

const pessoasFormatado = pessoas.map((pessoa)=> 
    ({
        nome = pessoa.nome,
        idade = `${pessoa.idade} anos`,
        altura = `${pessoa.altura/100}m`,
        maioridade = `É ${pessoa.idade>17?"maior":"menor"} de idade`
    })
);

console.log(pessoasFormatado);
