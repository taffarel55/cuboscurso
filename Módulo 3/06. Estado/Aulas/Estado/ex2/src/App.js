import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import { useState } from "react";

function App() {
  const temas = {
    dark: {
      nome: "dark",
      icon: "🌞",
      bgColor: "#282c34",
      txtColor: "#fff",
      btnColor: "primary",
    },
    light: {
      nome: "light",
      icon: "🌛",
      bgColor: "#eeeeee",
      txtColor: "#333",
      btnColor: "secondary",
    },
  };
  const [tema, setTema] = useState(temas.dark);

  function mudarTema() {
    setTema(tema.nome === "dark" ? temas.light : temas.dark);
  }

  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: tema.bgColor }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p style={{ color: tema.txtColor }}>Este é o tema {tema.nome}</p>
        <Button onClick={mudarTema} variant="contained" color={tema.btnColor}>
          Mudar {tema.icon}
        </Button>
      </header>
    </div>
  );
}

export default App;
