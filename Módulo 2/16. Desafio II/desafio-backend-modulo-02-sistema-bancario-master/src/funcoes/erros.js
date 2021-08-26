class Erro {
  constructor(status, mensagem) {
    this.status = status ?? 500;
    this.mensagem = mensagem ?? "Algo de errado não está certo!";
  }
}

module.exports = {
  Erro,
};