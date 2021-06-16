const numeros = [3, 4, 7, 8, 1, 6, 5, 10];
s = 0;
for (x of numeros) if (!(x%2)) s+=x;
console.log(s)