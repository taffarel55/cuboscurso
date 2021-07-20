const input = '3 3 0 0';
const grupos = input.split(' ').map(x=>Number(x));
let taxis = 0;


// console.log(`Os grupos sao: [${grupos}]`)
taxis+=grupos[3]+grupos[2];
// console.log(`=> As panelinhas de 3 e 4 cabecas ja ocuparam ${taxis} taxis`);
// console.log(`=> Assim, temos ${taxis} taxis ate agora, e os grupos restantes estao assim: [${grupos[0]},${grupos[1]},0,0]\n`);

if (grupos[0]>=grupos[2]) {
    // console.log(`=> Como sobrou espaco nos carros de 3 cabecas, ${grupos[2]} caras sozinhos(as) colaram la`);
    grupos[0]-=grupos[2];
}
else {
    // console.log(`=> Como sobrou espaco nos carros de 3 cabecas, ${grupos[0]} caras sozinhos(as) colaram la`);
    grupos[0]=0;
}
grupos[3]=0;
grupos[2]=0;
// console.log(`=> Assim, temos ${taxis} taxis ate agora, e os grupos restantes estao assim: [${grupos}]\n`);

const panelaDeDois = Math.floor(grupos[1]/2);
// console.log(`=> As panelas de 2 vao chamar ${panelaDeDois} taxis`)
taxis+=panelaDeDois;

grupos[0]+=2*(grupos[1]%2);
grupos[1]=0;
// console.log(`=> Assim, temos ${taxis} taxis ate agora, e os grupos restantes estao assim: [${grupos}]\n`);

taxis+=Math.ceil(grupos[0]/4)
// console.log(`Os ${grupos[0]} avulsos, chamaram ${Math.ceil(grupos[0]/4)} taxis`);
grupos[0]=0;
// console.log(`=> Assim, temos ${taxis} taxis ate agora, e os grupos restantes estao assim: [${grupos}]\n`);

console.log(taxis);