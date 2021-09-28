import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [formulario, setFormulario] = useState({ email: "", senha: "" });
  const [erros, setErros] = useState({ email: false, senha: false });
  const senhaRef = useRef();
  function handleChange({ target: t }) {
    setFormulario({ ...formulario, [t.name]: t.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (formulario.senha.length < 8) {
      setErros({ ...erros, senha: true });
      senhaRef.current.focus();
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <div className="">
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange}></input>
          </div>
          <div className="">
            <label>Senha:</label>
            <input
              ref={senhaRef}
              type="password"
              name="senha"
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
