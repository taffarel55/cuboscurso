const nomes = ["Ana", "Joana", "Carlos", "amanda"];
let nomesA = [];

for (x of nomes) {
    if (x[0] == 'A' || x[0] == 'a') nomesA.push(x); 
}

console.log(nomesA);