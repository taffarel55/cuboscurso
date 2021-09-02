const meses = ["Janeiro", "Fevereiro", "Março", "Abril"];

const janeiro = meses[0];
const fevereiro = meses[1];
const marco = meses[2];
const abril = meses[3];

console.log(janeiro, fevereiro, marco, abril);

// ou

const [, fev, mar, abr] = meses;

console.log(fev, mar, abr);
