const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Novembro",
  "Dezembro",
];

const [janeiro, fevereiro, marco, ...outros] = meses;

console.log(janeiro);
console.log(outros);