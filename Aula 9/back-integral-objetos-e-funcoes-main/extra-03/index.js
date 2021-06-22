const carrinho = {
    nomeDoCliente: "Guido Bernal",
    produtos: [
        {
            id: 1,
            nome: "Camisa",
            qtd: 3,
            precoUnit: 3000
        },
        {
            id: 2,
            nome: "Bermuda",
            qtd: 2,
            precoUnit: 5000
        }
    ],
    imprimirResumoDoCarrinho: function() {
        let n = 0;
        let t = 0;
        for (const prod of this.produtos) {
            n+=prod["qtd"];
            t+=prod["precoUnit"]*prod["qtd"];
        }
        console.log(`Cliente: ${this.nomeDoCliente}`);
        console.log(`Total de itens: ${n} itens`);
        console.log(`Total a pagar: R$ ${(t/100).toFixed(2)}`);
    },
    addProduto: function (produto) {
        let r = false;
        for (i = 0; i < this.produtos.length; i++) {
            if (produto.id == this.produtos[i].id) {
                this.produtos[i].qtd += produto.qtd;
                r = true;
            }
        }
        if (!r) {
            this.produtos.push(produto)
        }
    },
    imprimirDetalhes: function (){
        console.log(`Cliente: ${this.nomeDoCliente} \n`);
        for (let p of this.produtos) {
            console.log(`Item ${p.id} - ${p.nome} - ${p.qtd} und - R$ ${(p.qtd*p.precoUnit/100).toFixed(2)}`);
        }
        console.log('');
        let n=0;
        let t=0;
        for (const prod of this.produtos) {
            n+=prod["qtd"];
            t+=prod["precoUnit"]*prod["qtd"];
        }
        console.log(`Total de itens: ${n} itens`);
        console.log(`Total a pagar: R$ ${(t/100).toFixed(2)}`);
    }
}

const novaBermuda = {
    id: 2,
    nome: "Bermuda",
    qtd: 3,
    precoUnit: 5000
}

carrinho.addProduto(novaBermuda);
carrinho.imprimirResumoDoCarrinho();

console.log("---")

const novoTenis = {
    id: 3,
    nome: "Tenis",
    qtd: 1,
    precoUnit: 10000
}
carrinho.addProduto(novoTenis);
carrinho.imprimirResumoDoCarrinho();

console.log("---")

carrinho.imprimirDetalhes();    