const jogadores = ['Guido', 'Dina', 'Léo', 'Nanda', 'Juninho'];

let i = jogadores.length;
const ID = setInterval( () => {
    if (i) console.log(jogadores[--i]);
    else {
        console.log('A rodada terminou!');
        clearInterval(ID);
    }
},1000*(10/jogadores.length));