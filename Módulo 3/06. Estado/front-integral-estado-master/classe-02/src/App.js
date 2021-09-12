import React, { useState } from "react";
import bancoDados from "./dados";

function Card(props) {
  const user = Object.keys(bancoDados).find((x) => x === props.nick);
  const infoUser = bancoDados[user ?? "fulano"];
  const [follows, setFollows] = useState(infoUser.followers);

  function seguir() {
    if (infoUser.follow) {
      infoUser.follow = false;
      setFollows((f) => f - 1);
    } else {
      infoUser.follow = true;
      setFollows((f) => f + 1);
    }
  }

  return (
    <div>
      <div className="Card">
        <img src={infoUser.logo} alt="logo" />
        <h1>{infoUser.name}</h1>
        <h2>@{user}</h2>
        <p>{follows} seguidores</p>
        <p>{infoUser.following} seguidores</p>
      </div>
      <button
        className={`Card__button ${infoUser.follow ? "followed" : ""}`}
        onClick={seguir}
      >
        {!infoUser.follow ? "Seguir" : "Seguindo"}
      </button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Card nick="costa" />
      <Card nick="fulano" />
      <Card nick="ciclano" />
    </div>
  );
}

export default App;
