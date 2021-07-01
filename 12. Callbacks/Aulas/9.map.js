const array = [1,2,3,4,5];

// Elevar todos os itens ao quadrado

const arrayElevada = array.map((item, index, array)=>{
    return item**2;
});

console.log(arrayElevada);