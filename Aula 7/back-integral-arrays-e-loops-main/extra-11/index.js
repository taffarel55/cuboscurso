const original = [5, 7, 13, 17, 26, 34, 118, 245];
let nova = [];
for (x of original) 
    if (x>10&&x<20||x>100) 
        nova.push(x);
console.log(nova)