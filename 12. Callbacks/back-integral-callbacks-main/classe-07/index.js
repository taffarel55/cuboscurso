const jogadores = ['Guido', 'Dina', 'Léo', 'Nanda', 'Juninho'];

const fs = require('fs');

fs.writeFile("meuarquivo.txt", "Estou aprendendo JavaScript na Cubos Academy", function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("O arquivo foi salvo!");
});