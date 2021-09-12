import React, { useState } from "react";
import bancoDados from "./dados";

function Card(props) {
  const nomeProduto = Object.keys(bancoDados).find((x) => x === props.produto);
  const card = bancoDados[nomeProduto];
  const [produto, setProduto] = useState(card);

  function aumentar() {
    setProduto(prod=>({...prod,qtd:prod.qtd+1}));
  }

  function diminuir() {
    if (!(produto.qtd>0)) return;
    setProduto((prod) => ({ ...prod, qtd: prod.qtd - 1 }));
  }

  return (
    <div className="Card">
      <img src={card.img} alt="logo" />
      <h1>{card.name}</h1>
      <p>{card.desc}</p>
      <div className="boxqtd">
        <div className="button" onClick={diminuir}>
          -
        </div>
        {produto.qtd}
        <div className="button" onClick={aumentar}>
          +
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Card produto="hamburger" />
      <Card produto="fritas" />
      <Card produto="refri" />
    </div>
  );
}

export default App;
