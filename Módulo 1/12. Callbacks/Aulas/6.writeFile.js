const fs = require('fs');

const err = "Error asdasd asdasdasd asdasdasd"

fs.writeFile('novoArquivo.txt', err, ()=>{console.log("Arquivo escrito")});