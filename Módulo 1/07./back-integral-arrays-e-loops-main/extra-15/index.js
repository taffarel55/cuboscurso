const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pares = [];
const impares = [];

for (x of original) {
    if (x%2) impares.push(x);
    else pares.push(x);
}

console.log(pares,impares);