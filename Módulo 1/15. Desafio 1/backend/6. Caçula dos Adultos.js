lista = [12, 11, 18];

console.log(lista.filter(x=>x>=18).length===0?'CRESCA E APARECA':lista.filter(x=>x>=18).reduce((acc,x)=>x<acc?x:acc));