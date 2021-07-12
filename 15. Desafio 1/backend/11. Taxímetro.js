const min = 25;
const km  = 11.5;

const custoPorMin           = 50;
const custoPorMinAdicional  = 30;
const custoPorKm            = 70;
const custoPorKmAdicional   = 50;

let custo=0;
custo+=min>20?custoPorMin*20+custoPorMinAdicional*(min-20):custoPorMin*min;
custo+=(km>10)? custoPorKm*10+custoPorKmAdicional*(km-10):custoPorKm*km;

console.log(custo);