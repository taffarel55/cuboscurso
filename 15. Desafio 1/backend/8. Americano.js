const numeros = [0,0,0];

const soma = numeros.reduce((a, b) => a + b);
console.log(soma % numeros.length === 0 ? numeros.length : soma % numeros.length);