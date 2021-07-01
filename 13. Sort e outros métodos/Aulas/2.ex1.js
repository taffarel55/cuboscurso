const precos = [100,131,2542];

const isValid = precos.every(x=> x>=0 && x%1==0);

console.log(isValid);