const jogadores = [
    {
      "nome": "Herman",
      "jogada": 1
    },
    {
      "nome": "Rhodes",
      "jogada": 0
    },
    {
      "nome": "Beach",
      "jogada": 0
    },
    {
      "nome": "Laurel",
      "jogada": 0
    },
    {
      "nome": "Beatrice",
      "jogada": 0
    },
    {
      "nome": "Alison",
      "jogada": 0
    },
    {
      "nome": "Saundra",
      "jogada": 0
    },
    {
      "nome": "Klein",
      "jogada": 0
    }
  ];

// Salvo array com valores da jogada
let jogadas=[];

// Insiro as jogadas nessa array
jogadores.forEach((x,i) => {
    jogadas.push(x["jogada"])
});

// Testo se tem jogadores que ganharam com um
if (jogadas.indexOf(1)===jogadas.lastIndexOf(1)) {
    console.log(jogadores[jogadas.indexOf(1)]["nome"]);
// Testo se tem jogadores que ganharam com zero
} else if (jogadas.indexOf(0)===jogadas.lastIndexOf(0)) {
    console.log (jogadores[jogadas.indexOf(0)]["nome"]);
// Texto caso ninguem tenha ganhado
} else {
    console.log('NINGUEM');
}
