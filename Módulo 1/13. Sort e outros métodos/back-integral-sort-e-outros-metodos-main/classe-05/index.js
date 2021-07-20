const palavras = ["arroz", "feijão", "carne", "cerveja", "macarrão"];

console.log(palavras.some((x)=>x==='cerveja'||x==='vodka')?'revise sua lista, joão. possui bebida com venda proibida!':'tudo certo, vamos as compras!');