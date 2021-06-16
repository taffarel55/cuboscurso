const letras = ["A", "a", "B", "C", "E", "e"];
let num = 0;

for(let i=0; i<letras.length; i++) {
    if (letras[i].toUpperCase() == "E") num++;
}

if(num) console.log(`Foram encontradas ${num} 'E' ou 'e'`); 
else console.log(`Não foram encontradas as letras 'E' ou 'e'`)