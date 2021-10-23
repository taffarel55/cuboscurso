class Erro {
  constructor(status, mensagem) {
    this.status = status ?? 500;
    this.mensagem = mensagem ?? "Algo de inesperado aconteceu!";
  }
}

module.exports = {
  Erro,
};
