let contagem = 10;

const intervalID = setInterval(()=>{ 
    console.log(`A bomba explodirá em ${contagem} segundos`);
    contagem--;
},1000);