const pessoa = {
    nome: 'João',
    idade: 34,
    cidade: 'Salvador',
    profissão: 'Desenvolvedor'
}

const {nome:nome_da_pessoa, idade, ...outras} = pessoa

console.log(nome_da_pessoa, idade);
console.log(outras);