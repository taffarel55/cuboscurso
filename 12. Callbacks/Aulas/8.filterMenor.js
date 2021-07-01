const array = [1,2,3,4,5,6,7,8,9];

// Filtrar os maiores que 5

const arrayFiltrada = array.filter(x => x>5); 
console.log(arrayFiltrada);

console.log(array.filter(x => x>5).filter(x=>x%2));