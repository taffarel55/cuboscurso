const pessoa = { nome: "Mateus", idade: 20 };

const novaPessoa = {
  //Spread
  ...pessoa,
  idade: 19,
};

console.log(novaPessoa);
