const precos = [150, 50, 50];

if (precos.length>2) precos[ precos.indexOf(precos.reduce((acc,x)=>x<acc?x:acc))] /= 2;

const total = precos.reduce((a,b)=>a+b);

console.log(total);