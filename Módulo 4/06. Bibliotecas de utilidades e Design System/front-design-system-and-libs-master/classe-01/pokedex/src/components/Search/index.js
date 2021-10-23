import { TextField, Button } from "@material-ui/core";
import useStyles from "./style";

function SearchItem({ searchPokemon, setSearchPokemon, handleFindPokemon }) {
  const classes = useStyles();
  return (
    <form className={classes.root} onSubmit={(e) => e.preventDefault()}>
      <TextField
        label="Procurar novo pokémon"
        variant="outlined"
        value={searchPokemon}
        onChange={(e) => setSearchPokemon(e.target.value)}
      />
      <Button
        type="submit"
        onClick={handleFindPokemon}
        className={classes.button}
        variant="contained"
        color="secondary"
      >
        Procurar
      </Button>
    </form>
  );
}

export default SearchItem;
