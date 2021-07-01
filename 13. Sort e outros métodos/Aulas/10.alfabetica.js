const pessoas = [
    {
        nome: 'Jr',
        idade: 30
    },
    {
        nome: 'adriana',
        idade: 18
    },
    {
        nome: 'André',
        idade: 30
    },
    {
        nome: 'Carvalho',
        idade: 16
    },
    {
        nome: 'Cláudio',
        idade: 30
    }
];

pessoas.sort((a,b)=> a.idade-b.idade ? a.nome.localeCompare(b.nome) : a.idade-b.idade);

console.log(pessoas);