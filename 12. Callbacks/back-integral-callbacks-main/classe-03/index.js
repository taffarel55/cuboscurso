const frutas = ["Manga", "UVA", "abacaxi", "banaNA", "MAçã"];

console.log(frutas.map((x,i) => `${i} - ${x[0].toUpperCase()}${x.slice(1).toLowerCase()}`));