const jogada1 = "pedra"
const jogada2 = "tesoura"

if (jogada1 == jogada2) console.log("empate")
else {
    if (jogada1 == "pedra") {
        if (jogada2 == "tesoura") console.log("jogada1");
        else console.log("jogada2");
    } else if(jogada1 == "tesoura") {
        if (jogada2 == "papel") console.log("jogada1");
        else console.log("jogada2");
    } else {
        if (jogada2 == "pedra") console.log("jogada1");
        else console.log("jogada2");
    }
}