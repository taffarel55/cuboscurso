import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useState } from "react";

function App() {
  const [contador, setContador] = useState(0);

  function incrementar() {
    setContador(contador + 1);
  }

  function decrementar() {
    setContador(contador - 1);
  }

  function resetar() {
    setContador(0);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Contador: {contador}</p>
        <Box
          sx={{
            display: "grid",
            gap: 8,
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          <Button onClick={incrementar} variant="contained" color="primary">
            Contar
          </Button>
          <Button onClick={decrementar} variant="contained" color="secondary">
            Voltar
          </Button>
          <Button onClick={resetar} variant="contained" color="default">
            Resetar
          </Button>
        </Box>
      </header>
    </div>
  );
}

export default App;
