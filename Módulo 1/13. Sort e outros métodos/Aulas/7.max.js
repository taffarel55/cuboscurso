const array = [1,2,3,10,7,5];

// Sem reduce
let maior = array[0];
for(let i=1; i<array.length; i++) {
    if (array[i]>maior) maior=array[i];
}
console.log(maior);

maior = array.reduce((acc, item) => item>acc ? item : acc);

console.log(maior)