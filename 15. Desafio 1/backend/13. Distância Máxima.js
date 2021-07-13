//const input = "3\n0 0\n0 3\n4 0 ";
const input = "5\n3.56 17\n-5.1 36.3\n0.0002 -2\n5 5\n-9.01 -17.7";
//const input = "2\n0 0\n1 1";

const linhas = input.trim().split('\n');

const n = linhas[0];
const pontos = [];

for(let i=1; i<linhas.length; i++) {
    const c = linhas[i].split(" ");
    pontos.push({
        x: c[0],
        y: c[1]
    });
}

let maior = 0;

for (const p1 of pontos) {
    for (const p2 of pontos) {
        const d = Math.sqrt((p1.x-p2.x)**2+(p1.y-p2.y)**2);
        maior=maior>d?maior:d;
    }
} 

console.log(maior);