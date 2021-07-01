const notas = [6, 20, 33, 454, 8, 9, 9, 6, 8, 9, 20, 20, 33]

notasUnicas = [];

notas.forEach((x, i) => {
	if (notas.indexOf(x)===i) notasUnicas.push(x);
});

console.log(notasUnicas);