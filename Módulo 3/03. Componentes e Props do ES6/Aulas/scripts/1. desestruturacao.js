const pessoa = { nome: "Mateus", idade: 20 };

const nome = pessoa.nome;
const idade = pessoa.idade;

console.log(nome, idade);

// ou

const { nome: nomePessoa, idade: idadePessoa } = pessoa;

console.log(nomePessoa, idadePessoa);
