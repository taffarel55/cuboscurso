import "./index.css";

function Resume({ inp, out }) {
  const balance = inp - out;
  return (
    <div className="resume box">
      <div className="resume__title">Resumo</div>
      <div className="entradas">
        <div>Entradas</div>
        <div className="in">R$ {inp?.toFixed(2).replace(".", ",")}</div>
      </div>
      <div className="saidas">
        <div>Saídas</div>
        <div className="out">R$ {out?.toFixed(2).replace(".", ",")}</div>
      </div>
      <hr />
      <div className="saldo">
        <div>Saldo</div>
        <div className="balance">R$ {balance.toFixed(2).replace(".", ",")}</div>
      </div>
    </div>
  );
}

export default Resume;
