import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function InputSenha() {
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  return (
    <div className="form__item">
      <label htmlFor="senha">Senha: </label>
      <input type={senhaVisivel ? "text" : "password"} id="senha"></input>
      <input
        type="checkbox"
        onChange={() => setSenhaVisivel(!senhaVisivel)}
      ></input>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form className="App-form">
          <InputSenha />
          <button>Enviar</button>
        </form>
      </header>
    </div>
  );
}

export default App;
