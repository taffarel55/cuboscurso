const filaDeDentro = ["Jose", "Maria", "Joao"];
const filaDeFora = ["Joana", "Roberta", "Marcos", "Felipe"];
let i=0;

while(filaDeDentro.length<5) {
    filaDeDentro.push(filaDeFora[0]);
    filaDeFora.shift();
    i++; 
}

console.log(filaDeDentro, filaDeFora);