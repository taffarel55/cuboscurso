import "./App.css";
import { useState } from "react";
import Card from "./components/Card";
import getSpotifyToken from "./util/getSpotifyToken";

const baseURL = (pesquisa) =>
  `https://api.spotify.com/v1/search?q=${pesquisa}&type=track&limit=10`;

function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [tracks, setTracks] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
     if (!pesquisa) return;
    setErro('');
    setCarregando(true);
    try {
      const token = await getSpotifyToken();

      const response = await fetch(baseURL(pesquisa), {
        headers: {
          Authorization: token,
        },
      });

      const { tracks } = await response.json();

      setTracks(tracks.items);
    } catch (err) {
      setErro(err.message);
    }

    setCarregando(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
          <button type="submit">Pesquisar</button>
        </form>
        {carregando && <span className="loading">Carregando...</span>}
        {erro && <span className="erro">{erro}</span>}
        {tracks.length===0 && <span className="not-found">Nada encontrado</span>}
        <div className="musicas">
          {tracks.map((track) => (
            <Card track={track} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
