import "./App.css";
import { useState, useEffect } from "react";
import Pais from "./components/Pais";

function App() {
  const [input, setInput] = useState("");
  const [paises, setPaises] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [buscados, setBuscados] = useState([]);
  const [buscando, setBuscando] = useState(false);

  useEffect(() => {
    setCarregando(true);
    async function obterDados() {
      try {
        const response = await fetch("https://restcountries.com/v3/all");
        const data = await response.json();
        setPaises(data);
        setCarregando(false);
      } catch (erro) {
        console.log(erro);
      }
    }
    obterDados();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setInput(e.target.elements.pais.value);
    setBuscando(true);
    const pesquisaPaises = paises.map((p) => {
      return {
        nome: p.name.common,
        bandeira: p.flags[0],
        regiao: p.region,
        moeda: p.currencies,
      };
    });
    setBuscados(pesquisaPaises);
    setBuscando(false);
  }

  function filtro(pais) {
    if (input.length === 0) return false;
    return (
      pais.nome.toUpperCase().includes(input.toUpperCase()) ||
      pais.regiao.toUpperCase().includes(input.toUpperCase())
    );
  }

  return (
    <div className="App">
      <h1>Busca países</h1>
      {carregando && <div className="carregando">Carregando...</div>}
      {!carregando && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="pais"></input>
          <button type="submit">
            Pesquisar
          </button>
        </form>
      )}
      {buscando && <div className="buscando">Buscando...</div>}
      <div className="paises">
        {!buscando &&
          buscados
            .filter((p) => filtro(p))
            .map((p) => (
              <Pais
                key={p.nome}
                nome={p.nome}
                bandeira={p.bandeira}
                regiao={p.regiao}
                moeda={p.moeda}
              />
            ))}
      </div>
    </div>
  );
}

export default App;
