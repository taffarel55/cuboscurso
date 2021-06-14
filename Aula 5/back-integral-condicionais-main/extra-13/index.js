//tipo de pagamento (dinheiro, credito, debito, cheque).
const tipoDePagamento = "credito";

//valor da mercadoria (centavos)
const valorDoProduto = 13000;

var desconto = {
    "credito": 0.05,
    "cheque": 0.03,
    "debito": 0.10,
    "dinheiro": 0.10
};

console.log(`Valor a ser pago: R$ ${((1-desconto[tipoDePagamento])*valorDoProduto*0.01).toFixed(2)}`)