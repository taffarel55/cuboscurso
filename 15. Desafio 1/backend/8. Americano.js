const numeros = [1, 3, 2, 1, 5];

const soma = numeros.reduce((a, b) => a + b);

console.log(soma > numeros.length ? soma % numeros.length : soma);