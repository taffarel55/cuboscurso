const frutas = ["Manga", "UVA", "abacaxi", "banaNA", "MAçã"];

const frutasNova = frutas.map((x,i) => `${i} - ${x[0].toUpperCase()}${x.slice(1).toLowerCase()}`);

console.log(frutasNova);