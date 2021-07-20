//valor do produto comprado.
const valorDoProduto = 100000;

//quantidade de parcelas
const quantidadeDoParcelamento = 10;

//valor pago
const valorPago = 300;

const valorParcela = 0.01*valorDoProduto/quantidadeDoParcelamento;
console.log(`Restam ${quantidadeDoParcelamento-valorPago/valorParcela} parcelas de R$${valorParcela}`);