const cidades = ['Salvador', 'São Paulo', 'Brasilia', 'Recife', 'Rio de Janeiro'];

const cidadesNova = cidades.filter(x=>{
    if(x.length<9) return x;
});

console.log(cidadesNova);
console.log(cidadesNova.join(', '));