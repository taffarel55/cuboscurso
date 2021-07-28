function calculaSoma(lista) {
    let soma=0;
    for(const elemento of lista) soma+=elemento;
    return soma;
}

module.exports = {
    calculaSoma,
    outrovalor:'oi'
};