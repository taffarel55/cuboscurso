const array = [1,2,3,4,5,6,7,8,9];

array.forEach((x, i, a) => {
    console.log(`O elemento é ${x}, está no índice ${i}, no array ${a}`);
    x++;
});