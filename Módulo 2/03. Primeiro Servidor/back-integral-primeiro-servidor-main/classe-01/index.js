const pessoa = {
    nome: "Carlos",
    idade: 28,
    cidade: "Porto Alegre",
    apelidos: [
        "Carlão",
        "Carlinhos",
        "Carluxo"
    ]
};

const {nome,idade,... infosAdicionais} = pessoa;
const nomeDaPessoa = nome;
const idadeDaPessoa = idade;

console.log(nomeDaPessoa);
console.log(idadeDaPessoa);
console.log(infosAdicionais)