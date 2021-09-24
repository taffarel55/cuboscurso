import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [formulario, setFormulario] = useState({nome:"", idade:""});
  const [erro, setErro] = useState("");

  function handleChange({target}) {
    setFormulario({...formulario, [target.name]:target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();

    setErro('');

    if (formulario.nome.length < 3) {
      setErro("Nome muito pequeno");
      return;
    }

    if (formulario.idade < 13) {
      setErro("Muito novinho(a)");
      return;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {erro && <div className="erro">{erro}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input__input">
            <label htmlFor="nome">Nome: </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formulario.nome}
              onChange={handleChange}
            ></input>
          </div>
          <div className="input__input">
            <label htmlFor="idade">Idade: </label>
            <input
              type="number"
              id="idade"
              name="idade"
              value={formulario.idade}
              onChange={handleChange}
            ></input>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </header>
    </div>
  );
}

export default App;
