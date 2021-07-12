function solucao(min, max, valores) {
    console.log(valores.filter(x=>(x>=min && x<=max)));
}

solucao(2, 10, [0, 5, 6, 10, 11]);