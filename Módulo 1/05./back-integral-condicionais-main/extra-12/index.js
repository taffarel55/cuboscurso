const diaDaSemana = 1;

let dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

if (diaDaSemana<1 || diaDaSemana>7) console.log('O dia da semana informado não é válido.');
else console.log(`${dias[diaDaSemana-1]} ${diaDaSemana<6?'Feira':''}`);