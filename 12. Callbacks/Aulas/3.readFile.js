// Síncrono
const fs = require('fs');
console.log("Vou começar a ler o arquivo");
const buffer = fs.readFileSync('texto.txt')
console.log(buffer.toString());
console.log("Arquivo lido");

// Assíncrona
//const fs = require('fs');
console.log("Vou começar a ler o arquivo");
fs.readFile('texto.txt', (err, data) => {
    if (!err) {
        console.log(data.toString());
    }
});
console.log("Arquivo lido");