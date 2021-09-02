const pessoa = { nome: "Mateus", idade: 20 };

function logarPessoa({ nome, idade }) {
  // Desestruturação dentro de parametros de funções
  console.log(nome);
  console.log(idade);
}

logarPessoa(pessoa);
