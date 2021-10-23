import "./App.css";
import Navbar from "./components/Navbar";
import CustomCard from "./components/CustomCard";
import SearchItem from "./components/Search";
import { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";
import CustomAlert from "./components/CustomAlert";

function App() {
  // eslint-disable-next-line
  const [cacheSearch, setCacheSearch, removeCacheSearch] = useLocalStorage(
    "pokemonSearch",
    []
  );
  const [pokemon, setPokemon] = useState({});
  const [searchPokemon, setSearchPokemon] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleRequestToAPI();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    saveInCache();
    // eslint-disable-next-line
  }, [pokemon]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [open]);

  function saveInCache() {
    setCacheSearch([...cacheSearch, pokemon]);
  }

  async function handleFindPokemon() {
    const result = cacheSearch.find((item) => item.name === searchPokemon);
    if (result) {
      return setPokemon(result);
    }

    await handleRequestToAPI();
  }

  async function handleRequestToAPI() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchPokemon || "pikachu"}`
      );
      const {
        name,
        sprites: { other, front_default },
        abilities,
        moves,
        weight,
      } = await response.json();

      const currentPokemon = {
        name,
        weight,
        moves,
        abilities,
        avatar: front_default,
        img: other.dream_world.front_default,
      };
      setPokemon(currentPokemon);
    } catch (err) {
      setOpen(true);
      console.log(err);
    }
  }

  return (
    <div className="App">
      <Navbar />
      <div className="container-card">
        <CustomCard pokemon={pokemon} />
        {open && <CustomAlert />}
        <SearchItem
          searchPokemon={searchPokemon}
          setSearchPokemon={setSearchPokemon}
          handleFindPokemon={handleFindPokemon}
        />
      </div>
    </div>
  );
}

export default App;
