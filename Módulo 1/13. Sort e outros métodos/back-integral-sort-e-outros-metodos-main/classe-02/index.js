const cidades = ['Salvador', 'São Paulo', 'Brasilia', 'Recife', 'Rio de Janeiro'];

console.log(cidades.reduce((acc, x)=>x.length>acc.length ? x : acc));