const array = ["Olá","Aoba", "paralelepipedo", "outra coisa"];

const encontrado = array.find(x=>x.length>10);

if (encontrado) console.log(encontrado);
else console.log("Não encontrado")