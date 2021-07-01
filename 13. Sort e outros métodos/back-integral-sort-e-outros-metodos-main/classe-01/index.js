let numeros = [];
let frutas = [];

// A
numeros = [10, 1, 5, 50, 20, 30, 3, 4, 8, 2];
numeros.sort((a,b)=>a-b);
console.log(numeros);

// B
numeros = [10, 1, 5, 50, 20, 30, 3, 4, 8, 2];
numeros.sort((a,b)=>b-a);
console.log(numeros);

// C
numeros = [10, 1, 5, 50, 20, 30, 3, 4, 8, 2];
numeros.sort();
console.log(numeros);

// D
frutas = ["Banana", "Amora", "abacaxi", "uva", "Pera"];
frutas.sort((a,b)=> a.localeCompare(b));
console.log(frutas);

// E
frutas = ["Banana", "Amora", "abacaxi", "uva", "Pera"];
frutas.sort((a,b)=> b.localeCompare(a));
console.log(frutas);

// F
frutas = ["Banana", "Amora", "abacaxi", "uva", "Pera"];
frutas.sort((a,b)=> a.length-b.length);
console.log(frutas);