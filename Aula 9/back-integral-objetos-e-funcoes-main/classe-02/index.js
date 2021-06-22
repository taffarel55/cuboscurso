let carro = {
    ligado: false,
    velocidade: 0,
    ligar: function () {
        if (this.ligado) {
            console.log("Este carro já está ligado.");
        } else {
            this.ligado=true;
            this.status();
        }
    },
    desligar: function () {
        if (this.ligado) {
            this.ligado=false;
            this.velocidade=0;
            this.status();
        } else {
            console.log("Este carro já está desligado.");
        }
    },
    acelerar: function () {
        if (this.ligado) {
            this.velocidade+=10;
            this.status();
        } else {
            console.log("Não é possível acelerar um carro desligado.");
        }
    },
    desacelerar: function () {
        if (this.ligado) {
            this.velocidade-=10;
            this.status();
        } else {
            console.log("Não é possível desacelerar um carro desligado.");
        }
    },
    status: function() {
        console.log(`Carro ${this.ligado?'ligado':'desligado'}. Velocidade: ${this.velocidade}.`)
    }
}

carro.desligar();
carro.ligar();
carro.ligar();
carro.acelerar();
carro.acelerar();
carro.desacelerar();
carro.desligar();
carro.acelerar();
carro.desacelerar();