const nomes = [
    "Maria",
    "João",
    "José",
    "Antonio",
    "Beatriz",
    "Camila",
    "amanda",
]

const nomesFiltrados = nomes.filter(x=>x[0].toLowerCase()==='a');

console.log(nomesFiltrados);