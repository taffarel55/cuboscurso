const array = [0,1,2,3,4,5];

// Primeira forma
let soma = array[0];
for (let i = 1; i<array.length; i++) {
    soma+=array[i];
}
console.log(soma);

// Com reduce
soma = array.reduce((acc, item) => acc+item);
console.log(soma);