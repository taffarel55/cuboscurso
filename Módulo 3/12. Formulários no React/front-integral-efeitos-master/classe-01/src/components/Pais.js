export default function Pais({ nome, bandeira, regiao, moeda }) {
  const grana = moeda? moeda[Object.keys(moeda)[0]]:false;
  return (
    <div className="pais">
      <div className="info">
        <div className="pais__name">{nome}</div>
        <div className="pais__regiao">{regiao}</div>
        <div className="pais__moeda">
          {!grana ? "" : `${grana.name} (${grana.symbol})`}
        </div>
      </div>
      <img src={bandeira} alt={nome} />
    </div>
  );
}
