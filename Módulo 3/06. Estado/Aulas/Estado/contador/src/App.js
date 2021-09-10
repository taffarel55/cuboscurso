import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import { useState } from "react";

function App() {
  const [contador, setContador] = useState(0);

  function contar() {
    setContador(contador + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Contador: {contador}</p>
        <Button onClick={contar} variant="contained" color="primary">
          Contar
        </Button>
      </header>
    </div>
  );
}

export default App;
