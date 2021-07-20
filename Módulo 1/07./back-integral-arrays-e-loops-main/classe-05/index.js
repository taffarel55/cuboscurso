const original = [1, 4, 12, 21, 53, 88, 112];
let nova = [];

for (let x of original) if (x%2==0) nova.push(x)

console.log(nova);
